import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitBtn) {
    super(popupSelector);
    this.handleSubmitBtn = handleSubmitBtn;
    this._popupForm = this._popupObject.querySelector(".popup__form");
    this._inputList = Array.from(this._popupForm.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    const formInputsValue = {};

    this._inputList.forEach((formInput) => {
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

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
