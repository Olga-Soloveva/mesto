import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitBtn) {
    super(popupSelector);
    this.handleSubmitBtn = handleSubmitBtn;
    this._popupForm = this._popupObject.querySelector(".popup__form");
    this._inputList = Array.from(this._popupForm.querySelectorAll(".popup__input"));
    this._submitBtn= this._popupObject.querySelector(".popup__button");
    this._submitBtnText = this._submitBtn.textContent
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
      this._submitBtn.textContent = 'Сохранение...'
      this.handleSubmitBtn(this._getInputValues());
    });
    super.setEventListeners();
  }

  editTextBtn() {
    this._submitBtn.textContent = this._submitBtnText
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
