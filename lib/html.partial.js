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
	var regex = /(@Html.Partial{)[\s\S](})/gm;
	return content;
}