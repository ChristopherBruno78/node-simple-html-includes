"use strict";

/*
	Provides possibiltiy to use a layout
	to render the HTML file. Contents of file
	will be placed inside of @RenderBody in
	the file provided.
*/
const fs = require("fs");

module.exports = function (content) {

	let regex = /(@{)[\s\S]+}/gm,
		result = regex.exec(content);

	console.log(result);

	return content;
}