import {openPopup} from './index.js'

const popupViewCard = document.querySelector('.popup_type_open-card');
const popupImg = popupViewCard.querySelector('.popup__card');
const popupImgName = popupViewCard.querySelector('.popup__card-name');

export default class Card {
  constructor(card, cardSelector) {
    this._name = card.name;
    this._link = card.link;
    this._cardSelector = cardSelector;
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

  // Функция: посмотреть фотографию на полный экран

  _handleViewPhoto() {
    popupImg.src = this._link;
    popupImg.alt = `Фото ${this._name}`;
    popupImgName.textContent = this._name;
    openPopup(popupViewCard);
  }

  // Функция: создать карточку со слушателями

  getItemElement() {
    const newItemElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    const newItemPhoto = newItemElement.querySelector('.element__photo');
    const newItemPlaceName = newItemElement.querySelector('.element__place-name');
    const deleteButton = newItemElement.querySelector('.delete-button');
    const likeButton = newItemElement.querySelector('.like-button');
    newItemPhoto.src = this._link;
    newItemPhoto.alt = `Фото ${this._name}`;
    newItemPlaceName.textContent = this._name;
    deleteButton.addEventListener('click', this._handleDeleteItem);
    likeButton.addEventListener('click', this._handleLikeItem);
    newItemPhoto.addEventListener('click', () => {
      this._handleViewPhoto()
    });
    return newItemElement;
  }
}


