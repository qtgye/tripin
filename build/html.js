require('colors');
const path = require('path');
const fs = require('fs-extra');
const chokidar = require('chokidar');
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');

const PROJECT_ROOT = process.cwd();
const TEMPLATES_ROOT = path.resolve(PROJECT_ROOT, 'src/templates');
const PAGES_ROOT = path.resolve(TEMPLATES_ROOT, 'pages');
const PUBLIC_ROOT = path.resolve(PROJECT_ROOT, 'public');

let loader;
let twing;

function initializeTwing() {
	loader = new TwingLoaderFilesystem(TEMPLATES_ROOT);
	twing = new TwingEnvironment(loader);
	// Add @templates namespace
	loader.addPath(TEMPLATES_ROOT, 'templates');
}

// COMPILES A SINGLE PAGE
function compileSingle(fileName) {
	// Ensure valid twig file
	if ( !/\.twig$/.test(fileName) ) {
		return;
	}

	try {
		const template = twing.load(`@templates/pages/${fileName}`);
		const html = template.render({});
		const outputFilePath = path.resolve(PUBLIC_ROOT, fileName.replace(/twig$/, 'html'));
		fs.outputFileSync(outputFilePath, html);
		console.log(`Compiled ${outputFilePath}`.green);
	}
	catch (err) {
		console.log(err.message.red);
		console.error(err);
	}
}

// COMPILE FROM PAGES
function compile() {
	try {
		initializeTwing();
		const files = fs.readdirSync(PAGES_ROOT);
		files.forEach(file => compileSingle(file));
	}
	catch (err) {
		console.log(err.message.red);
		console.error(err);
	}
}

function watch() {
	// Initialize watcher.
	const watcher = chokidar.watch(TEMPLATES_ROOT, { persistent: true });

	// Start watch
	watcher.on('all', () => compile());

	// Handle error
	watcher.on('error', err => {throw err});
}

module.exports = { compile, watch };
