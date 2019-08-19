const path = require('path');
const browserSync = require('browser-sync').create();

const PROJECT_ROOT = process.cwd();
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, 'public');

browserSync.init({
  server: {
      baseDir: PUBLIC_DIR
  },
  files: path.resolve(PUBLIC_DIR, '**/*.*')
}, () => {
	browserSync.initialized = true;
});

module.exports = { browserSync };
