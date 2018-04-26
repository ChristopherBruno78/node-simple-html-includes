"use strict";

/*
	Searches for variables used in code:

	@(myVariable)

	Requires:
	- "at" sign and parantheses
	- variable name
	- no spaces from beginning to end of statement
*/
module.exports = function (content, model) {

	if (!model) return content;

	let regex = /(@\()[\w\.]+(\))/g,
		result = null;

	while ((result = regex.exec(content)) !== null) {
		let property = result[0];
		property = property.substr(2, property.length - 3);

		if (model[property]) {
			content = content.replace("@("+property+")", model[property]);
		}
	}

	return content;
}