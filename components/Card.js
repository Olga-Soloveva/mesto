export default class Card {
  constructor( {name, link}, cardSelector, handleCardClick ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // Функция: клонировать темплейт

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.cloneNode(true);

    return cardTemplate
  }

  //Функция: поставить/убрать лайк у карточки

  _handleLikeItem(evt) {
    evt.target.classList.toggle('like-button_active');
  }

  //Функция: удалить карточку

  _handleDeleteItem(evt) {
    const deleteCard = evt.target.closest('.element');
    deleteCard.remove();
  }

  // Функция: установить слушатели

  _setEventListeners() {
    this._newItemElement.querySelector('.delete-button').addEventListener('click', this._handleDeleteItem);
    this._newItemElement.querySelector('.like-button').addEventListener('click', this._handleLikeItem);
    this._newItemElement.querySelector('.element__photo').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  // Функция: создать карточку со слушателями

  generateCard() {
    this._newItemElement = this._getTemplate()

    this._newItemElement.querySelector('.element__photo').src = this._link;
    this._newItemElement.querySelector('.element__photo').alt = `Фото ${this._name}`;
    this._newItemElement.querySelector('.element__place-name').textContent = this._name;
    this._setEventListeners()

    return this._newItemElement;
  }

}


