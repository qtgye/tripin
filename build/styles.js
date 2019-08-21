require('colors');
const fs = require('fs-extra');
const path = require('path');
const sass = require('node-sass');
const chokidar = require('chokidar');

const PROJECT_ROOT = process.cwd();
const SASS_ROOT = path.resolve(PROJECT_ROOT, 'src/sass');
const MAIN_FILE = path.resolve(SASS_ROOT, 'main.scss');
const OUTPUT_FILE = path.resolve(PROJECT_ROOT, 'public/styles/main.css');

function compile() {
	try {
		// Get content of main file
		const SASS_CONTENT = fs.readFileSync(MAIN_FILE).toString();

		// Compile SCSS
		const { css } = sass.renderSync({
		  data: SASS_CONTENT,
		  outputStyle: 'compressed',
		  includePaths: [SASS_ROOT],
		  sourceMapEmbed: true,
		});

		// Write CSS
		fs.outputFileSync(OUTPUT_FILE, css);

		console.log(`Compiled ${OUTPUT_FILE}`.green);
	}
	catch (err) {
		console.log(err.message.red);
		console.error(err);
	}
}

function watch() {
	// Initialize watcher.
	const watcher = chokidar.watch(SASS_ROOT, { persistent: true });

	// Start watch
	watcher.on('all', () => compile());

	// Handle error
	watcher.on('error', err => {throw err});
}

module.exports = { compile, watch };
