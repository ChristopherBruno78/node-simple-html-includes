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
	var regex = /(@Html\.Partial\()[\s\S]+(}\))/gm,
		result = regex.exec(content),
		json = null;

	if (result) {

		// Reduce codeblock to string and optional json
		let codeBlock = result[0];
		codeBlock = codeBlock.replace("@Html.Partial(", '');
		codeBlock = codeBlock.substr(0, codeBlock.length - 1);

		// Get json from codeblock
		let jsonRegex = /{[\s\S]+}/g,
			jsonString = jsonRegex.exec(codeBlock),
			json = JSON.parse(jsonString);

		// Get layout from codeblock
		codeBlock = codeBlock.replace(jsonRegex, '');
		codeBlock = codeBlock.replace(/[",\s]/g, '');

		let layoutFile = codeBlock,
			partial = fs.readFileSync(layoutFile, "utf8");

		content = content.replace(regex, partial);
	}

	return content;
}