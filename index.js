'use strict';

var scanningHTMLFile = require('./app.js');
var Input = require('./src/input.js');
var Output = require('./src/output.js');
var fs = require('fs');

/**
 * Setup pre-defined SEO rules
 */
var rules = {
    img: 'alt', // if there are any <img />tags without alt attribute
    a: 'rel', // if there are any <a />tags without rel attribute
    head: {
        title: true, // if there is any header that doesn’t have <title>tag
        meta: ["description", "robots", "keywords"], // If you want to implement additional rule for meta tag, you just need to add a new tag to array.
    },
    strong: 15, // there are more than 15 <strong>tag in HTML
    h1: 1, // if a HTML have more than one <H1>tag
};


var scanningHTMLFile = new scanningHTMLFile();

/**
 * Setup The input is A HTML file from the path
 * @param {object} input - used to feed in HTML file source
 */
scanningHTMLFile.setInput(new Input().createInputFile(__dirname+"/test/Node.js.html"));

/**
 * Setup the input is A Node Readable Stream
 * @param {object} input - used to feed in HTML file source
 */
// var readable_stream = fs.createReadStream(__dirname+"/test/Node.js.html");
// scanningHTMLFile.setInput(new Input().createInputStream(readable_stream));

/**
 * Setup the output is console
 * @param {object} output - console
 */
scanningHTMLFile.setOutput(new Output().createOutputConsole());

/**
 * Setup the output is a file
 * @param {object} output - used to feed in HTML file source
 */
// scanningHTMLFile.setOutput(new Output().createOutputFile(__dirname+"/output.txt"));


/**
 * Setup the output is A Node Readable Stream
 * @param {object} output - used to feed in HTML file source
 */
// var writeable_stream = fs.createWriteStream(__dirname + '/outstream.txt')
// scanningHTMLFile.setOutput(new Output().createOutputStream(writeable_stream));

console.log("Show all of the SEO defects");
scanningHTMLFile.detectSEOtag(rules);
console.log("Finish all SEO defects scan");