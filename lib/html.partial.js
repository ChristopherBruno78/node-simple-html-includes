/*
	Allows the rendering of a partial HTML
	page.

	@Html.Partial("path/to/file.ext")

	Works like a file include where the
	contents will be inserted into the document.
*/
module.exports = function (content) {
	var regex = /(@Html.Partial{)[\s\S](})/gm;
}