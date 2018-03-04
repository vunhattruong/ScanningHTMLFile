# ScanningHTMLFile
Developing a Node.js package to let a user use this package to scan a  HTML file and show all of the SEO defects.

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

# Installation
Install Scanning HTML file SEO defects globally using npm:
npm install --save scanning-html-file

# Example
To get familiar with usage of the module:
node index.js

Output should be printed to terminal like below:

Show all of the SEO defects
Finish all SEO defects scan

All <img> in this HTML file contain attribute "alt".
This HTML file contains 30 <a> tag without rel attribute.
This HTML file does not have a <meta name="description" .../> tag
This HTML file does not have a <meta name="keywords" .../> tag
This HTML has less than 15, <strong> tag. Count = 0
This HTML has less than 1, <h1> tag. Count = 0

# Usage
The input can be either:
I. A HTML file (User is able to config the input path)
II. Node Readable Stream

The output can be either:
I. A file (User is able to config the output destination)
II. Node Writable Stream
III. Console

# Basic usage
1. Input file:
/**
 * Setup The input is A HTML file from the path
 * @param {object} input - used to feed in HTML file source
 */
scanningHTMLFile.setInput(new Input().createInputFile(__dirname+"/test/Node.js.html"));

/**
 * Setup the output is console
 * @param {object} output - console
 */
scanningHTMLFile.setOutput(new Output().createOutputConsole());

2. Input readable stream:
/**
 * Setup the input is A Node Readable Stream
 * @param {object} input - used to feed in HTML file source
 */
var readable_stream = fs.createReadStream(__dirname+"/test/Node.js.html");
scanningHTMLFile.setInput(new Input().createInputStream(readable_stream));

3. Output to console:
/**
 * Setup the output is console
 * @param {object} output - console
 */
scanningHTMLFile.setOutput(new Output().createOutputConsole());

4. Output to a file:
/**
 * Setup the output is a file
 * @param {object} output - used to feed in HTML file source
 */
scanningHTMLFile.setOutput(new Output().createOutputFile(__dirname+"/output.txt"));

5. Output to readable stream:
/**
 * Setup the output is A Node Readable Stream
 * @param {object} output - used to feed in HTML file source
 */
var writeable_stream = fs.createWriteStream(__dirname + '/outstream.txt')
scanningHTMLFile.setOutput(new Output().createOutputStream(writeable_stream));

6. Pre-defined SEO rules:
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

#License
This project is licensed under the MIT License - see the LICENSE file for details.

