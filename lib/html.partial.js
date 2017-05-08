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

module.exports = function (content) {
	var regex = /(@Html\.Partial\()[\.\/\\_,\s{:"a-zA-Z}]+(\))/g,
		result = "",
		json = null;

	while ((result = regex.exec(content)) !== null) {


		// Reduce codeblock to string and optional json
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
		codeBlock = codeBlock.replace(jsonRegex, '');
		codeBlock = codeBlock.replace(/[",\s]/g, '');

		// TODO provide meaningful error, but don't stop processing other files
		let layoutFile = codeBlock,
			partial = fs.readFileSync(layoutFile, "utf8");

		content = content.replace(result[0], partial);

		result = null;
		codeBlock = null;
		jsonString = null;
		json = null;
		layoutFile = null;
		partial = null;
	}

	return content;
}