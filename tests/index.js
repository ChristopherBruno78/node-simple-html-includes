const simpleHTMLIncludes = require("./../lib/index.js");
const assert = require("assert");
const fs = require("fs");

describe("Node Simple HTML Includes", function () {

	// TODO change to async code
	// TODO don't rely on regex (?)

	it("Use a Layout along with @RenderBody()", function () {
		let responseObject = simpleHTMLIncludes("./tests/_layout.test.html"),
			result = fs.readFileSync("./tests/_layout.result.html", "utf8").toString();

		assert.equal(responseObject.content, result);
	});

	it("Use @Html.Partial()", function (callback) {
		let responseObject = simpleHTMLIncludes("./tests/_html.partial.test.html");

		fs.readFile("./tests/_html.partial.result.html", function (err, data) {
			assert.equal(data, responseObject.content);
			callback();
		});
	});

	it("Use multiple @Html.Partials", function (callback) {
		let responseObject = simpleHTMLIncludes("./tests/_html.partials.test.html");

		fs.readFile("./tests/_html.partials.result.html", function (err, data) {
			assert.equal(data, responseObject.content);
			callback();
		});
	});

	it("Use JSON as a second parameter for @Html.Partial()", function (callback) {
		let responseObject = simpleHTMLIncludes("./tests/_variable.test.html", {
			variable: "Hello World",
			variable2: "Hello World 2"
		});

		fs.readFile("./tests/_variable.result.html", function (err, data) {
			assert.equal(responseObject.content, data);
			callback();
		});
	});

	it("Should not error when processing other scripts", function (callback) {
		let responseObject = simpleHTMLIncludes("./tests/_scripts.test.html");
		fs.readFile("./tests/_scripts.result.html", function (err, data) {
			assert.equal(responseObject.content, data);
			callback();
		});
	});

	it("Should render a nested partial with no additional new lines or html", function(callback) {
		let responseObject = simpleHTMLIncludes("./tests/_html.partial.nested.test.html");
		fs.readFile("./tests/_partial.nested.result.html", "utf8", function (err, data) {
			assert.equal(responseObject.content, data);
			callback();
		});
	});

	it("Should not error out because of special characters in JSON", function (callback) {
		let responseObject = simpleHTMLIncludes("./tests/_html.partial.special-chars.test.html");
		fs.readFile("./tests/_html.partial.special-chars.result.html", "utf8", function (err, data) {
			assert.equal(responseObject.content, data);
			callback();
		});
	});
});