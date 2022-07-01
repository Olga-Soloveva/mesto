import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitBtn) {
    super(popupSelector);
    this._popupForm = this._popupObject.querySelector(".popup__form");
    this.handleSubmitBtn = handleSubmitBtn;
  }

  _getInputValues() {
    const formInputsValue = {};
    const formInputs = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );

    formInputs.forEach((formInput) => {
      const inputName = formInput.getAttribute("name");
      formInputsValue[inputName] = formInput.value;
    });
    return formInputsValue;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleSubmitBtn(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
