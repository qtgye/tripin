class Modal {
	static selector = '.modal';

	constructor(element) {
		this.element = element;
		this.overlay = this.element.querySelector('.modal__overlay');
		[...this.dismissButtons] = this.element.querySelectorAll('.modal__dismiss');
	}

	init() {
		this.bindDismissButtons();
		this.bindOverlay();
		this.bindEscape();
	}

	bindDismissButtons() {
		this.dismissButtons.forEach(dismiss => {
			dismiss.addEventListener('click', e => this.handleDismissClick(e));
		});
	}

	bindOverlay() {
		this.overlay.addEventListener('click', e => this.handleOverlayClick(e));
	}

	bindEscape() {
		window.addEventListener('keyup', e => this.handleKeyUp(e));
	}

	handleDismissClick(e) {
		e.preventDefault();
		this.hide();
	}

	handleOverlayClick(e) {
		e.preventDefault();
		this.hide();
	}

	handleKeyUp(e) {
		// Escape
		if ( e.keyCode === 27 ) {
			this.hide();
		}
	}

	hide() {
		this.element.classList.remove('modal--visible');
	}

	show() {
		this.element.classList.add('modal--visible');
	}
}

export default Modal;