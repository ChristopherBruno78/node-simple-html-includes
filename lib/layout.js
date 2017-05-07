"use strict";

/*
	Provides possibiltiy to use a layout
	to render the HTML file. Contents of file
	will be placed inside of @RenderBody in
	the file provided.
*/
const fs = require("fs");

module.exports = function (content) {

	let regex = /(@{)[\s\S]+}$\s*[\r\n]/gm,
		result = regex.exec(content),
		json = null;

	if (result) {
		result = result[0].replace(`@`, '');
		try {
			json = JSON.parse(result);
			console.log(`JSON: ${json}`);
		} catch (e) {
			throw Error `Call to JSON.parse() with ${result} resulted in an error.`;
		}
	}

	if (json["Layout"]) {
		let master = fs.readFileSync(json["Layout"], "utf8");
		content = content.replace(regex, '');
		content = master.replace(/.{0,}@RenderBody.{0,}/ig, content);
	}

	return content;
}