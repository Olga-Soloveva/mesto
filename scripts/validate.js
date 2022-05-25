// Функция: показать элемент с текстом ошибки
const showInputError = (obj, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${obj['inputErrorClass']}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${obj['errorClass']}`);
}

// Функция: скрыть элемент с текстом ошибки
const hideInputError = (obj, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${obj['inputErrorClass']}`);
  errorElement.classList.remove(`${obj['errorClass']}`);
  errorElement.textContent = '';
};

// Функция: проверить валидность поля (в резльтате показать или скрыть элемент ошибки)
const checkInputValidity = (obj, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(obj, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(obj, formElement, inputElement);
  }
};

// Функция: проверить все поля формы на невалидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Функция: изменять статус кнопки (активная/неактивная)
const toggleButtonState = (obj, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${obj['inactiveButtonClass']}`);
    buttonElement.setAttribute('disabled', 'true');

  } else {
    buttonElement.classList.remove(`${obj['inactiveButtonClass']}`);
    buttonElement.removeAttribute('disabled');
  }
};

// Функция: установить слушатель событий на элементы формы при инпуте
const setEventListeners = (obj, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(`${obj['inputSelector']}`));
  const buttonElement = formElement.querySelector(`${obj['submitButtonSelector']}`);

  toggleButtonState(obj, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(obj, formElement, inputElement)
      toggleButtonState(obj, inputList, buttonElement);
    });
  });
};

// Функция: запустить фалидацию по всем формам
const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(`${obj.formSelector}`));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(obj, formElement);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

