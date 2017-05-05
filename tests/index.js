const simpleHTMLIncludes = require("./../lib/index.js");
const assert = require("assert");
const fs = require("fs");

describe("Node Simple HTML Includes", function () {

	it("Layout", function () {
		let content = simpleHTMLIncludes("./tests/_layout.test.html"),
			result = fs.readFileSync("./tests/_layout.result.html", "utf8");

		assert.equal(content, result);
	});

	// it("Html.Partial", function () {
	// 	let result = simpleHTMLIncludes("./_html.partial.test.html");

	// 	fs.readFile("./_html.partial.result.html", function (err, data) {
	// 		assert.equal(data, result);
	// 	});
	// });

	// it("Variable", function () {
	// 	let result = simpleHTMLIncludes("./_variable.test.html");
	// 	//fs.readFile("./variable.html", function (err, data) {});

	// 	fs.readFile("./_variable.result.html", function (err, data) {
	// 		assert.equal(data, result);
	// 	});
	// });

});