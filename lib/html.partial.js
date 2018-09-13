"use strict";

/*
	Allows the rendering of a partial HTML
	page.

	@Html.Partial("path/to/file.ext", { myVariable: "" })

	Works like a file include where the
	contents will be inserted into the document.

	The first argument is required: a path to the file
	to include.

	The second argument is optional: JSON variables
	that can be replaced in the partial.
*/
const fs = require("fs");
const variable = require("./variable.js");

module.exports = function (content, dependencies) {
	var regex = /(@Html\.Partial\()[\.\/\\_,\s{:"a-zA-Z0-9\&;}-]+(\))/g,
		result = "";
	
	//This will get called everytime there is a @Partial call inside of content
	while ((result = regex.exec(content)) !== null) {
		// Reduce codeblock to file path string and optional json
		// result[0] is always the entire partial call
		let codeBlock = result[0];
		codeBlock = codeBlock.replace("@Html.Partial(", '');
		codeBlock = codeBlock.substr(0, codeBlock.length - 1);

		// Get json from codeblock
		let jsonRegex = /{[\s\S]+}/g,
			jsonString = jsonRegex.exec(codeBlock),
			json = null;
		if (jsonString !== null) {
			json = JSON.parse(jsonString);
		}

		// Get layout from codeblock
		// Layout evaluates to the file path, which is then used to pass the actual content to partial
		codeBlock = codeBlock.replace(jsonRegex, '');
		codeBlock = codeBlock.replace(/[",\s]/g, '');

		// TODO provide meaningful error, but don't stop processing other files
		let layoutFile = codeBlock,
			partial;
		try {
			partial = fs.readFileSync(layoutFile, "utf8");
		} catch (err) {
			console.log(err);
		}
		if (json != null) {
			partial = variable(partial, json);
		}
		if (partial) {
			dependencies.push(layoutFile);
		}

		// Replace the specific html partial call with the generated partial content
		content = content.replace(result[0], partial);
		// Reset all variables for next iteration
		result = null;
		codeBlock = null;
		jsonString = null;
		json = null;
		layoutFile = null;
		partial = null;
		//The regex needs to be reset at the end of each loop. Otherwise, the regex.exec will always fail.
		// https://stackoverflow.com/questions/4724701/regexp-exec-returns-null-sporadically
		regex = /(@Html\.Partial\()[\.\/\\_,\s{:"a-zA-Z0-9\&;}-]+(\))/g;
	}
	return content;
};