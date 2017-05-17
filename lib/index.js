"use strict";

const htmlPartial = require("./html.partial.js");
const layout = require("./layout.js");
const variable = require("./variable.js");
const fs = require("fs");

module.exports = function (file, model) {

	let dependencies = [];
	let content = fs.readFileSync(file, "utf8");

	content = layout(content, dependencies);
	content = htmlPartial(content, dependencies);
	content = variable(content, model);

	return {
		content,
		dependencies
	}

}