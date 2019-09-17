const scss = require("postcss-scss");
const precss = require("precss");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");
var colorFunction = require("postcss-color-function")
 
module.exports = {
	// parser: ,
	syntax: scss,
	plugins: [precss, colorFunction, postcssImport]
};

// https://github.com/michael-ciniawsky/postcss-load-config

// module.exports = {
//     plugins: {
//         // to edit target browsers: use "browserslist" field in package.json
//         "postcss-import": {},
//         autoprefixer: {}
//     }
// };
