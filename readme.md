# Simple HTML Includes
v0.1.2

A simple node package that provides Razor-like syntax (ASP.NET) to your HTML files.

- Provides Layout, Partial, and Variable replacement.
- Razor-like syntax, JSON formatted.
- Regex(s) are used to parse HTML documents.
- Most likely used in conjunction with node-watch or a custom build script.

# Quick Getting Started

One way to use this package is with `node-watch`. Here is a quick guide to getting up and running with `node-simple-html-includes`.

## 1 - Install

Install both packages.

```
npm i node-simple-html-includes --save-dev
npm i node-watch --save-dev
```

## 2 - Create a script

We will run this script to watch your HTML files and process the Razor syntax. We can call this `watch.js`.

```
var watch = require("node-watch");
var nodeSimpleHtmlIncludes = require("node-simple-html-includes");

watch("./src/", {
	recursive: true,
	filter: /\.{htm,html}$/
},
function(evt, name) {
	if (evt === "update") {
		// process html file with nodeSimpleHtmlIncludes
		let content = nodeSimpleHtmlIncludes(name);

		// now do something with content
		// like write to disk
	}
});
```

# Quick Examples of Razor-like Syntax

These examples are of the Razor syntax you can use in your HTML documents. Note that paths were always relative to the project, not necessarily the loaded HTML file.

## Using a Layout

```
@{
	"Layout": "./path/to/layout.html"
}
```

- Only the property `Layout` will be resolved.
- Finds `@RenderBody` and replaces it with the remaining content.

## Using a Partial

```
@Html.Partial("./path/to/partial.html", {
	"myVariable": "myVal"
})
```

- Supports JSON as a second parameter.
- Will replace variables inside of the partial with the provided JSON values.

## Using Variables

```
@(myVariable)
```

- Provided a set of JSON as a model, will replace `myVariable` with the correct value.

# Roadmap

- Alternative to regex
- Additional Razor language support
- Perhaps not require JSON syntax for variables