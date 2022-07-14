export default class Card {
  constructor(
    { name, link, likes, _id },
    owner,
    cardSelector,
    handleCardClick,
    handleConfirmAction
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this.__id = _id;
    this._owner = owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleConfirmAction = handleConfirmAction;
  }

  // Функция: клонировать темплейт

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);

    return cardTemplate;
  }

  //Функция: поставить/убрать лайк у карточки

  _handleLikeItem(evt) {
    evt.target.classList.toggle("like-button_active");
  }

  //Функция: удалить карточку

  _handleDeleteItem(card) {
    card.remove();
  }

  // Функция: создать карточку со слушателями

  generateCard() {
    this._newItemElement = this._getTemplate();
    this._newItemElement.querySelector(".element").id = this.__id;
    this._newItemPhoto = this._newItemElement.querySelector(".element__photo");
    this._newItemPlaceName = this._newItemElement.querySelector(
      ".element__place-name"
    );
    this._likeCounter = this._newItemElement.querySelector(
      ".element__like-counter"
    );

    if (this._owner === true) {
      this._deleteBtn = this._newItemElement
        .querySelector(".delete-button")
        .classList.add("delete-button_visible");
    }

    this._newItemPhoto.src = this._link;
    this._newItemPhoto.alt = `Фото ${this._name}`;
    this._newItemPlaceName.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;
    
    this._setEventListeners();

    return this._newItemElement;
  }

  // Функция: установить слушатели

  _setEventListeners() {
    this._deleteButton = this._newItemElement.querySelector(".delete-button");
    this._likeButton = this._newItemElement.querySelector(".like-button");

    this._deleteButton.addEventListener("click", (evt) => {
      const deleteCardInfo = evt.target.closest(".element");
      this._handleConfirmAction(deleteCardInfo);
    });
    this._likeButton.addEventListener("click", this._handleLikeItem);
    this._newItemPhoto.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
