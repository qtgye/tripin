import Component from './component.js';

class PlacesList extends Component {
	static selector = '.places-list';

	// Should store row objects
	// { name: String, element: HTMLElement }
	rows;

	constructor(element) {
		super(element);

		this.nameHeader = element.querySelector('.places-list__name-header');
		this.body = element.querySelector('.places-list__body');
	}

	init() {
		this.saveRows();

		this.nameHeader.addEventListener('click', e => this.handleHeaderClick(e));
	}

	saveRows() {
		const [...rows] = this.element.querySelectorAll('.places-list__item');

		this.rows = rows.map(row => ({
			element: row,
			name: row.firstElementChild.textContent.trim(),
		}));
	}

	handleHeaderClick(e) {
		e.preventDefault();

		const isAscending = this.nameHeader.classList.contains('places-list__name-header--ascending');

		if ( isAscending ) {
			this.sortDescending();
		}
		else {
			this.sortAscending();
		}
	}

	sortDescending() {
		this.rows
			.sort((rowA, rowB) => rowA.name > rowB.name ? 1 : -1)
			.forEach(({ element }) => this.body.appendChild(element));

		this.nameHeader.classList.remove('places-list__name-header--ascending');
	}

	sortAscending() {
		this.rows
			.sort((rowA, rowB) => rowA.name < rowB.name ? 1 : -1)
			.forEach(({ element }) => this.body.appendChild(element));

		this.nameHeader.classList.add('places-list__name-header--ascending');
	}
}

export default PlacesList;