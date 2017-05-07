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

	let regex = /(@\()[\w\.]+(\))/gm,
		result = regex.exec(content);

	if(result) {
		let property = result[0];
		property = property.substr(2, property.length - 3);

		if (model[property]) {
			content = content.replace(regex, model[property]);
		}
	}

	return content;
}