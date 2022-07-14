import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import popupConfirmAction from "../components/PopupConfirmAction.js"
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  cardListSelector,
  buttonEditProfile,
  buttonAddCard,
  options,
} from "../utils/constants.js";

// Создать экземпляры классов: информация о пользователе, лист карточек

const profileInfo = new UserInfo(
  ".profile__person-name",
  ".profile__description",
  ".profile__avatar"
);

const cardList = new Section(
  {
    items: [],
    renderer: ({ item, owner }) => {
      const newCard = new Card(
        item,
        owner,
        "#template-photo",
        handleCardClick,
        handleConfirmAction
      );
      const cardItem = newCard.generateCard();
      return cardItem;
    },
  },
  cardListSelector
);

// Загрузить данные с сервера и отрендерить: информация о пользователе, лист карточек

const api = new Api(options);

const firstPromise = api.getUserInfo();
const secondPromise = api.getInitialCards();

const promises = [firstPromise, secondPromise];

Promise.all(promises).then((results) => {
  profileInfo.renderUserInfo(results[0]);
  const userId = results[0]._id;

  results[1].forEach((item) => {
    let owner;
    if (item.owner._id === userId) {
      owner = true;
    } else {
      owner = false;
    }
    cardList.addItem({ item, owner });
  });
});

// Функция: редактировать профиль

const popupEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  ({ nameInput, descriptionInput }) => {
    api.editUserInfo({ nameInput, descriptionInput }).then((res) => {
      profileInfo.setUserInfo(res);
    });
  }
);

popupEditProfile.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  api.getUserInfo().then((res) => {
    const userData = profileInfo.getUserInfo(res);
    popupEditProfile.setInputValues(userData);
    formValidators["editprofile"].resetError();
    popupEditProfile.open();
  });
});

// Функция: добавить новую карточку

const popupAddCard = new PopupWithForm(
  ".popup_type_add-card",
  ({ placeInput, linkInput }) => {
    api.sendCardInfo({ placeInput, linkInput }).then((res) => {
      cardList.prependItem({
        item: { name: res.name, link: res.link, likes: [], _id: res._id },
        owner: true,
      });
    });
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

// Функция: открыть Popup для подтверждения действия удаления карточки


const popupConfirmDeleteCard = new popupConfirmAction(".popup_type_confirm", deleteCard);

popupConfirmDeleteCard.setEventListeners();

function handleConfirmAction(data) {
  popupConfirmDeleteCard.open(data);
}

function deleteCard(data) {
  api.deleteCardInfo({ cardId: data.id }).then((res) => {
    if (res) {
      data.remove();
    }
  });
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

//УДАЛИТЬ
// api.getUserInfo2();
