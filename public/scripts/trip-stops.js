import Component from './component.js';
import Modal from './modal.js';

class TripStops extends Component {
	static selector = '.trip-stops';

	// Should be false when adding
	editMode = false;

	// Should store current card data being editted in the form
	selectedCard;

	// Should store cardData, regardless of positions
	cards = [];

	constructor(element) {
	  super(element);

		// Grid elements
	  this.addStop = this.element.querySelector('.trip-stops__add-button');
	  this.grid = this.element.querySelector('.trip-stops__grid');
	  this.cardTemplate = this.element.querySelector('.trip-stops__card-template');

	  // Remove card template from DOM
	  this.cardTemplate.parentElement.removeChild(this.cardTemplate);

		// Moda Elements
	  this.modalElement = this.element.querySelector('.modal');
	  this.searchInput = this.modalElement.querySelector('.input-block--search input');
	  this.positionSelect = this.modalElement.querySelector('.input-block--position .custom-select');
	  this.notesInput = this.modalElement.querySelector('.input-block--notes textarea');
	  this.updateButton = this.modalElement.querySelector('.trip-stops-modal__update');
	  this.addButton = this.modalElement.querySelector('.trip-stops-modal__add');
	}

	init() {
		this.initializeModal();
		this.bindModalForm();
		this.bindAddStop();
	}

	initializeModal() {
		this.modal = new Modal(this.modalElement);
		this.modal.init();
	}

	bindAddStop() {
		this.addStop.addEventListener('click', e => this.handleAddStopClick(e));
	}

	bindModalForm() {
		this.updateButton.addEventListener('click', e => this.handleModalFormUpdate(e));
		this.addButton.addEventListener('click', e => this.handleModalFormAdd(e));
	}

	resetModalForm() {
		this.searchInput.value = '';
		this.positionSelect.CustomSelect.reset();
		this.notesInput.value = '';
	}

	handleAddStopClick(e) {
		e.preventDefault();
		this.setEditMode(false)
		this.resetModalForm();
		this.modal.show();
	}

	handleModalFormAdd(e) {
		e.preventDefault();

		const formData = this.gatherFormData();

		this.addCard(formData);
		this.modal.hide();
	}

	handleModalFormUpdate(e) {
		e.preventDefault();

		if ( this.editMode && this.selectedCard ) {
			const formData = this.gatherFormData();
			this.updateCard(this.selectedCard, formData);
		}

		this.modal.hide();
	}

	gatherFormData() {
		return {
			name: this.searchInput.value,
			position: Number(this.positionSelect.CustomSelect.value) + 1,
			notes: this.notesInput.value,
		}
	}

	addCard(data) {
		const { name, position, notes } = data;
		const newCard = this.cardTemplate.cloneNode(true);
		const card = { data, element: newCard };

		this.setCardContents(newCard, data);

		newCard.classList.remove('trip-stops__card-template');
		newCard.removeAttribute('hidden');
		
		// Append to store
		this.cards.push(card);

		// DOM updates
		this.bindCardControls(card);
		this.sortGrid();
	}

	updateCard(cardData, newData) {
		cardData.data.name = newData.name;
		cardData.data.position = newData.position;
		cardData.data.notes = newData.notes;

		this.setCardContents(cardData.element, cardData.data);
		this.sortGrid();
	}

	deleteCard(card) {
		const index = this.cards.indexOf(card);

		// Remove card from DOM
		this.grid.removeChild(card.element);

		// Remove card from store
		this.cards.splice(index, 1);
	}

	setCardContents(element, data) {
		const { position, name, notes } = data;

		element.querySelector('.trip-stops__card-number').textContent = position;
		element.querySelector('.trip-stops__card-heading').textContent = name;
		element.querySelector('.trip-stops__card-subheading').textContent = notes;
	}

	bindCardControls(cardData) {
		const cardControls = cardData.element.querySelector('.trip-stops__card-controls');
		const cardEdit = cardData.element.querySelector('[data-action="edit"]');
		const cardHide = cardData.element.querySelector('[data-action="hide"]');
		const cardDelete = cardData.element.querySelector('[data-action="delete"]');

		cardControls.addEventListener('click', e => {
			e.preventDefault();
			cardData.element.classList.toggle('trip-stops__card--expanded');
		});

		cardEdit.addEventListener('click', e => this.handleCardControl(e, cardData, 'edit'));
		cardHide.addEventListener('click', e => this.handleCardControl(e, cardData, 'hide'));
		cardDelete.addEventListener('click', e => this.handleCardControl(e, cardData, 'delete'));
	}

	handleCardControl(e, cardData, action) {
		e.preventDefault();

		cardData.element.classList.remove('trip-stops__card--expanded');

		switch(action) {
			case 'edit':
				this.setEditMode(true);
				this.selectedCard = cardData;
				this.setModalFormData(cardData.data);
				this.modal.show();
				break;
			case 'delete':
				this.deleteCard(cardData);
				break;
		}
	}

	setEditMode(editMode) {
		this.editMode = editMode;

		if ( editMode ) {
			this.modalElement.classList.add('trip-stops-modal--edit');
		}
		else {
			this.modalElement.classList.remove('trip-stops-modal--edit');
		}
	}

	setModalFormData(data) {
		this.searchInput.value = data.name;
	  this.positionSelect.CustomSelect.selectByValue(data.position - 1);
	  this.notesInput.value = data.notes;
	}

	sortGrid() {
		// Sort card data by position
		const sortedCards = this.cards.sort((cardDataA, cardDataB) => cardDataA.data.position > cardDataB.data.position ? 1 : -1);

		// Update DOM
		sortedCards.forEach(({ element }) => {
			if ( this.grid.contains(element) ) {
				this.grid.removeChild(element);
			}
			this.grid.appendChild(element);
		});
	}
}

export default TripStops;