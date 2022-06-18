import Card from './Card.js'
import FormValidator from './FormValidator.js'

const initialCards = [
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1556610961-2fecc5927173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2867&q=80'
  },
  {
    name: 'Казань',
    link: 'https://images.unsplash.com/photo-1628066068625-015ea7bcc21a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80'
  },
  {
    name: 'Нью-Йорк',
    link: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80'
  },
  {
    name: 'Париж',
    link: 'https://images.unsplash.com/photo-1492136344046-866c85e0bf04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2328&q=80'
  },
  {
    name: 'Лондон',
    link: 'https://images.unsplash.com/photo-1483972117325-ce4920ff780b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80'
  }
];

const itemCardsWrapper = document.querySelector('.elements');

const profilePersonName = document.querySelector('.profile__person-name');
const profileDescription = document.querySelector('.profile__description');

const popupList = document.querySelectorAll('.popup');

const popupViewCard = document.querySelector('.popup_type_open-card');
const popupImg = popupViewCard.querySelector('.popup__card');
const popupImgName = popupViewCard.querySelector('.popup__card-name');

const popupAddCard = document.querySelector('.popup_type_add-card');
const popupFormAddCard = popupAddCard.querySelector('.popup__form');
const formPlaceName = popupAddCard.querySelector('#place-input');
const formLink = popupAddCard.querySelector('#link-input');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupFormEditProfile = popupEditProfile.querySelector('.popup__form');
const formPersonName = popupEditProfile.querySelector('#name-input');
const formDescription = popupEditProfile.querySelector('#description-input');

const buttonEditProfile = document.querySelector('.edit-button');
const buttonAddCard = document.querySelector('.add-button');
const buttonsPopupClose = document.querySelectorAll('.popup__close');

// Функция: создать карточки

function createCard(item) {
  const newCard = new Card(item, '#template-photo', handleCardClick)
  const cardElement = newCard.getItemElement()

  return cardElement
}

// Функция: рендерить карточки

const renderItemAppend = (wrap, card) => {
  wrap.append(card);
}

const renderItemPrepend = (wrap, card) => {
  wrap.prepend(card);
}

// Произвести рендеринг карточек через входящий массив

initialCards.forEach(item => {
  renderItemAppend(itemCardsWrapper, createCard(item));
})

// Функции: установить слушатель события нажатия на кнопку Esc

const pressButtonEsc = evt => {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened')
    closePopup(popupOpen)
 }
}

// Функции: открыть и закрыть Popup

export const openPopup = popupObject => {
  popupObject.classList.add('popup_opened');
  document.addEventListener('keydown', pressButtonEsc);
}

const closePopup = popupObject => {
  popupObject.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressButtonEsc);
}

// Функция: посмотреть фотографию на полный экран

function handleCardClick(name, link) {
  popupImg.src = link;
  popupImg.alt = `Фото ${name}`;
  popupImgName.textContent = name;
  openPopup(popupViewCard);
}

// Обработка события для редактирoвания профиль

buttonEditProfile.addEventListener('click', evt => {
  formPersonName.value = profilePersonName.textContent;
  formDescription.value = profileDescription.textContent;
  formValidators['editprofile'].resetError()
  openPopup(popupEditProfile);
});

popupFormEditProfile.addEventListener('submit', evt => {
  evt.preventDefault();
  profilePersonName.textContent = formPersonName.value;
  profileDescription.textContent = formDescription.value;
  closePopup(popupEditProfile);
});

// Обработка событий для добавления новых фотокарточек

buttonAddCard.addEventListener('click', evt => {
  popupFormAddCard.reset();
  formValidators['addcard'].resetError()
  formValidators['addcard'].deactivateButton();
  openPopup(popupAddCard);
});

popupFormAddCard.addEventListener('submit', evt => {
  evt.preventDefault();
  renderItemPrepend(itemCardsWrapper, createCard({name: formPlaceName.value, link: formLink.value}));
  closePopup(popupAddCard);
});

// Функция: добавить слушатель на все кнопки закрытия Popup

buttonsPopupClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup)
  })
});

// Добавить слушатель на закрытие Popup по клику на Overlay

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.target)
    }
  })
})

function newFunction() {
  test();
}

// Запустить валидацию по всем формам (создать объект из всех форм валидации)

const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)

    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
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
