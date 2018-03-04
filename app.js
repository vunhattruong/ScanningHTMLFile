'use strict';

var _ = require('underscore');
var lodash = require('lodash');
var htmlparser = require('htmlparser2');
var when = require('when');

// Constants
const META_TAG = "meta";
const TITLE_TAG = "title";

function scanningHTMLFile(){

    this.input = null;
    this.output = null;

}

/**
 * Setup input method
 * @param {object} input - used to feed in HTML file source
 */
scanningHTMLFile.prototype.setInput = function(input){
    this.input = input;
}

/**
 * Setup output method
 * @param {object} output - used to represent SEO defect result
 */
scanningHTMLFile.prototype.setOutput = function(output){
    this.output = output;
}

scanningHTMLFile.prototype.detectSEOtag = function(rules) {
    var deferred = when.defer();
    var str = "";
    // All the HTML Tags from a html document with attributes
    let htmlTags = [];

    const htmlFileParser = new htmlparser.Parser({
        onopentag: (name, attributes) => {
        // Extracts all the tags with its attributes using a key, value storage
        // all tags and attribute are in lowercase.
        htmlTags.push({
        name,
        attributes
    });
},
    onend: () => {
        //Do nothing;
    }
});

    // Filter the tag with a certain tagName
    const limit = (tag, limit) => {
        const tagCount = htmlTags.filter(htmlTag => htmlTag.name === tag).length;
        if (tagCount > limit) {
            // if the tag count is greater than limit
            str +=
                "In this HTML there are more than " + limit +  " <" + tag +  "> tag. Count = " +tagCount + "\r\n";
        } else {
            str +=
                "This HTML has less than " + limit +  ", <" + tag +  "> tag. Count = " +tagCount + "\r\n";
        }
    };

    // Find if the html has title tag
    // Assuming that the title tag will only be present in the HEAD Tag
    // Title anywhere outside head tag should be illegal and not be used.
    const headTitle = () => {
        const tagCount = htmlTags.filter(htmlTag => htmlTag.name === TITLE_TAG).length || 0;
        if (tagCount  === 0 ) {
            str += "This HTML file does not have a <title> tag in <head>" + "\r\n";
        }
    };

    // Find meta tags in the HEAD element of HTML
    // If html file doesn't have a meta tag with a certain name.
    const headMeta = (names) => {
        names.forEach(name => {
            const tagWithNameCount = htmlTags.filter(
                htmlTag => (htmlTag.name === META_TAG && htmlTag.attributes !== undefined && htmlTag.attributes.name === name)
    ).length;
        if (tagWithNameCount === 0) {
            str += "This HTML file does not have a <meta name=\""+ name+"\" .../> tag" + "\r\n";
        }
    });
    };

    // Check the limit of a certain HTML tag
    const occourence = (tag, attribute) => {
        const tagWithoutAttribute = htmlTags.filter(
            htmlTag => htmlTag.name === tag &&
            (lodash.isEmpty(htmlTag.attributes) || !htmlTag.attributes.hasOwnProperty(attribute))
    ).length;
        if (tagWithoutAttribute > 0) {
            str +=
                "This HTML file contains " + tagWithoutAttribute+" <" + tag+ "> tag without " + attribute +" attribute." + "\r\n";
        } else {
            str +=
                "All <" + tag + "> in this HTML file contain attribute \"" + attribute + "\"." + "\r\n";
        }

    };

    // Handle rules with files.
    const ruleHandler = (rules) => {
        Object.keys(rules).map( rule => {
            if (!isNaN(rules[rule])) {
            limit(rule, rules[rule]);
        } else if (rule === 'head') {
            if (rules[rule].title !== undefined) {
                headTitle();
            };
            if (rules[rule].meta !== undefined) {
                headMeta(rules[rule].meta);
            }
        } else {
            occourence(rule, rules[rule]);
        }
    });
    };

    // Parse and process a HTML file
    // Single file parse HTML test
    if (_.isNull(this.input))
        deferred.reject(new Error('Invalid input object'));
    else
        this.input().done(
            (result) => {
                htmlTags = [];
                htmlFileParser.write(result);
                htmlFileParser.end();
                ruleHandler(rules);
                if (!_.isNull(this.output))
                    this.output(str);
            })
};

module.exports = scanningHTMLFile;