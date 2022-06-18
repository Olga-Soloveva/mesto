export default class Card {
  constructor(card, cardSelector, handleCardClick) {
    this._name = card.name;
    this._link = card.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._newItemElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    this._newItemPhoto = this._newItemElement.querySelector('.element__photo');
    this._newItemPlaceName = this._newItemElement.querySelector('.element__place-name');
    this._deleteButton = this._newItemElement.querySelector('.delete-button');
    this._likeButton = this._newItemElement.querySelector('.like-button');
  }

  //Функция: поставить/убрать лайк у карточки

  _handleLikeItem = evt => {
    evt.target.classList.toggle('like-button_active');
  }

  //Функция: удалить карточку

  _handleDeleteItem = evt => {
    const deleteCard = evt.target.closest('.element');
    deleteCard.remove();
  }

  // Функция: установить слушатели

  _setEventListeners() {
    this._deleteButton.addEventListener('click', this._handleDeleteItem);
    this._likeButton.addEventListener('click', this._handleLikeItem);
    this._newItemPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  // Функция: создать карточку со слушателями

  getItemElement() {

    this._newItemPhoto.src = this._link;
    this._newItemPhoto.alt = `Фото ${this._name}`;
    this._newItemPlaceName.textContent = this._name;
    this._setEventListeners()
    return this._newItemElement;
  }
}


