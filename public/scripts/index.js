import Header from './header.js';

// Determine touch support
if ( 'ontouchstart' in document ) {
	document.body.classList.add('touch');
}

Header.init();
