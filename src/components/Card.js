export default class Card {
  constructor(
    { name, link, likes, _id },
    owner,
    like,
    cardSelector,
    handleCardClick,
    handleDeleteBtn,
    handleLikeBtn
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this.__id = _id;
    this._owner = owner;
    this._like = like;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBtn = handleDeleteBtn;
    this._handleLikeBtn = handleLikeBtn;
  }

   _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector(".element").id = this.__id;
    this._cardPhoto = this._card.querySelector(".element__photo");
    this._cardName = this._card.querySelector(".element__place-name");
    this._likeCounter = this._card.querySelector(".element__like-counter");
    this._deleteBtn = this._card.querySelector(".delete-button");
    this._likeBtn = this._card.querySelector(".like-button");

    if (this._owner === true) {
      this._deleteBtn.classList.add("delete-button_visible");
    }

    if (this._like === true) {
      this._likeBtn.classList.add("like-button_active");
    }

    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = `Фото ${this._name}`;
    this._cardName.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._deleteBtn.addEventListener("click", (evt) => {
      const deleteCardInfo = evt.target.closest(".element");
      this._handleDeleteBtn(deleteCardInfo);
    });

    this._likeBtn.addEventListener("click", (evt) => {
      const likeCardInfo = evt.target.closest(".element");
      this._handleLikeBtn(likeCardInfo);
    });

    this._cardPhoto.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
