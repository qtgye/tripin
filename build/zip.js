require('colors');
const fs = require('fs-extra');
const path = require('path');
const { zip } = require('zip-a-folder');

const PROJECT_ROOT = process.cwd();
const PUBLIC_ROOT = path.resolve(PROJECT_ROOT, 'public');
const TEMPORARY_OUTPUT_FILE = path.resolve(PROJECT_ROOT, 'public.zip');
const OUTPUT_FILE = path.resolve(PROJECT_ROOT, 'public/public.zip');

(async function() {
	try {
		// Remove existing zip files
		fs.removeSync(TEMPORARY_OUTPUT_FILE);
		fs.removeSync(OUTPUT_FILE);

		console.log('Archiving public folder...');

		// Archive folder
		await zip(PUBLIC_ROOT, TEMPORARY_OUTPUT_FILE);

		// Move temporary file into public folder
		fs.moveSync(TEMPORARY_OUTPUT_FILE, OUTPUT_FILE);

		// Log
		console.log(`Successfuly zipped public files into`, OUTPUT_FILE.green);
	}
	catch (err) {
		throw err;
	}
})();

