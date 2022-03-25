"use strict";

const htmlPartial = require("./html.partial.js");
const layout = require("./layout.js");
const variable = require("./variable.js");
const fs = require("fs");
const path = require("path");

module.exports = function (file, model) {

	let dependencies = [];
	let content = fs.readFileSync(file, "utf8");

	console.log(path.dirname(file));
	content = layout(content, dependencies, path.dirname(file));
	content = htmlPartial(content, dependencies, path.dirname(file));
	content = variable(content, model);

	return {
		content,
		dependencies
	}

}