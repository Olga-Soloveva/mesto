import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popupObject.querySelector(".popup__card");
    this._popupImgName = this._popupObject.querySelector(".popup__card-name");
  }

  open(name, link) {
    this._popupImg.src = link;
    this._popupImg.alt = `Фото ${name}`;
    this._popupImgName.textContent = name;
    super.open()
  }
}
