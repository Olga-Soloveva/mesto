import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
  cardListSelector,
  buttonEditProfile,
  buttonAddCard,
} from "../utils/constants.js";

// Произвести рендеринг карточек через входящий массив

const CardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, "#template-photo", handleCardClick);
      const cardItem = newCard.generateCard();
      return cardItem;
    },
  },
  cardListSelector
);

CardList.renderItems();

// Функция: редактировать профиль

const profileInfo = new UserInfo(
  ".profile__person-name",
  ".profile__description"
);

const popupEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  ({ nameInput, descriptionInput }) => {
    profileInfo.setUserInfo(nameInput, descriptionInput);
  }
);

popupEditProfile.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  const userData = profileInfo.getUserInfo();
  popupEditProfile.setInputValues(userData);
  formValidators["editprofile"].resetError();
  popupEditProfile.open();
});

// Функция: добавить новую карточку

const popupAddCard = new PopupWithForm(
  ".popup_type_add-card",
  ({ placeinput, linkinput }) => {
    CardList.prependItem({ name: placeinput, link: linkinput });
  }
);
popupAddCard.setEventListeners();

buttonAddCard.addEventListener("click", (evt) => {
  formValidators["addcard"].resetError();
  formValidators["addcard"].deactivateButton();
  popupAddCard.open();
});

// Функция: открыть Popup по клику на карточку (посмотреть фотографию на полный экран)

const popupOpenCard = new PopupWithImage(".popup_type_open-card");

popupOpenCard.setEventListeners();

function handleCardClick(name, link) {
  popupOpenCard.open(name, link);
}

// Создать объект из всех форм валидации (экземпляры классов с свойствами и методами)

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);

    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// Запустить валидацию по всем формам

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
