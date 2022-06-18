export default class FormValidator {
  constructor(object, formElement) {
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._formElement = formElement
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  // Функция: показать элемент с текстом ошибки

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Функция: скрыть элемент с текстом ошибки

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // Функция: проверить валидность поля (в резльтате показать или скрыть элемент ошибки)

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Функция: проверить все поля формы на невалидность

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  //Функция: деактивировать кнопку

  deactivateButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'true');
  }

  //Функция: активировать кнопку

  activateButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }
  // Функция: изменять статус кнопки (активная/неактивная)

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.deactivateButton()
    } else {
      this.activateButton()
    }
  };

//Функция: сбросить ошибки

  resetError() {
    this._toggleButtonState();

    const errorList = Array.from(this._formElement.querySelectorAll('.popup__error'))
      errorList.forEach((errorElement) => {
      errorElement.classList.remove('popup__error_visible');
    })
    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove('popup__input_type_error');
    })
  }

 // Функция: установить слушатель событий на элементы формы при инпуте

  _setEventListeners() {
     this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState();
      });
    });
  };

  // Функция: запустить фалидацию

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}
