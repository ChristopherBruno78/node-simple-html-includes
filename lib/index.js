"use strict";

const htmlPartial = require("./html.partial.js");
const layout = require("./layout.js");
const variable = require("./variable.js");
const fs = require("fs");

module.exports = function (file, model) {
	let content = fs.readFileSync(file, "utf8");

	content = layout(content);
	content = htmlPartial(content);
	content = variable(content, model);

	return content;

}