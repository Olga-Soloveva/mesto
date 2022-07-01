export default class Popup {
  constructor(popupSelector) {
    this._popupObject = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupObject.querySelector(".popup__close");
  }

  open() {
    this._popupObject.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupObject.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", () => {
      this.close();
    });
    this._popupObject.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
