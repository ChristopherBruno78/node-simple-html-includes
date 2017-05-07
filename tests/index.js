const simpleHTMLIncludes = require("./../lib/index.js");
const assert = require("assert");
const fs = require("fs");

describe("Node Simple HTML Includes", function () {

	// TODO change to async code
	// TODO don't rely on regex (?)

	it("Layout", function () {
		let content = simpleHTMLIncludes("./tests/_layout.test.html"),
			result = fs.readFileSync("./tests/_layout.result.html", "utf8");

		assert.equal(content, result);
	});

	it("Html.Partial", function (callback) {
		let result = simpleHTMLIncludes("./tests/_html.partial.test.html");

		fs.readFile("./tests/_html.partial.result.html", function (err, data) {
			assert.equal(data, result);
			callback();
		});
	});

	it("Variable", function () {
		let result = simpleHTMLIncludes("./tests/_variable.test.html", {
			variable: "Hello World"
		});
		//fs.readFile("./variable.html", function (err, data) {});

		fs.readFile("./_variable.result.html", function (err, data) {
			assert.equal(data, result);
		});
	});

});