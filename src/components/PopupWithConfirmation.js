import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector);
    this._popupBtn = this._popupObject.querySelector(".popup__button");
    this._deleteCard = deleteCard;
  }

  open(data) {
    this._cardDelete = data;
    super.open();
  }

  setEventListeners() {
    this._popupBtn.addEventListener("click", (evt) => {
      this._deleteCard(this._cardDelete);
    });
    super.setEventListeners();
  }
}
