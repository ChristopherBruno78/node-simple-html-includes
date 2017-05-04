/*
	Searches for variables used in code:

	@(myVariable)

	Requires:
	- "at" sign and parantheses
	- variable name
	- no spaces from beginning to end of statement
*/
module.exports = function (content) {
	var regex = /(@\()[\w]+(\))/gm;
}