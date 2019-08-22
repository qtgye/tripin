import Component from './component.js';

class CustomSelect extends Component {
	static selector = '.custom-select';

	// Holds the currently selected option element.
	selectedOption;

	constructor(element) {
		super(element);

		// Reference to the native select.
		this.nativeSelect = this.element.querySelector('select');

		// Reference to the toggle.
		this.toggle = this.element.querySelector('.custom-select__toggle');

		// Reference to the search input.
		this.search = this.element.querySelector('.custom-select__search');

		this.selectedText = this.element.querySelector('.custom-select__selected');
	}

	init() {
		this.toggle.addEventListener('click', e => this.handleClick(e));

		if ( this.search ) {
			this.search.addEventListener('click', e => e.stopPropagation());
		}

		this.bindOptions();
		this.bindBodyClick();
	}

	handleClick(e) {
		e.stopPropagation();
		e.preventDefault();

		// Toggle dropdown
		if ( this.element.classList.contains('custom-select--expanded') ) {
			this.closeDropdown();
		}
		else {
			this.openDropdown();
		}
	}

	handleOptionClick(e) {
		e.stopPropagation();

		// Close dropdown
		this.closeDropdown();

		// Show selected
		this.setSelected(e.currentTarget);
	}

	bindOptions() {
		[...this.options] = this.element.querySelectorAll('.custom-select__option');

		this.options.forEach(option => {
			option.addEventListener('click', e => this.handleOptionClick(e));

			if ( option.classList.contains('custom-select__option--selected') ) {
				this.setSelected(option);
			}
		});
	}

	bindBodyClick() {
		document.body.addEventListener('click', () => this.closeDropdown());
	}

	openDropdown() {
		this.element.classList.add('custom-select--expanded');
	}

	closeDropdown() {
		this.element.classList.remove('custom-select--expanded');
	}

	/**
	 * Uses a given option element to show as selected
	 * @param {HTMLElement} option
	 */
	setSelected(option) {
		const { textContent, dataset } = option;
		this.selectedText.textContent = textContent;

		if ( option !== this.selectedOption ) {
			if ( this.selectedOption instanceof HTMLElement ) {
				this.selectedOption.classList.remove('custom-select__option--selected');
			}

			this.selectedOption = option;
			option.classList.add('custom-select__option--selected');

			// Update native select value.
			this.nativeSelect.value = dataset.value;
		}

		// Should emit event passing dataset.value
	}
}

export default CustomSelect;