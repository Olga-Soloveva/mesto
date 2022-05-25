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

const template = document.querySelector('#template-photo');

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

//Функция: поставить/убрать лайк у карточки

const handleLikeItem = evt => {
  evt.target.classList.toggle('like-button_active');
}

//Функция: удалить карточку

const handleDeleteItem = evt => {
  const deleteCard = evt.target.closest('.element');
  deleteCard.remove();
}

// Функция: посмотреть фотографию на полный экран

const handleViewPhoto = (card) => {
  popupImg.src = card.link;
  popupImg.alt = `Фото ${card.name}`;
  popupImgName.textContent = card.name;
  openPopup(popupViewCard);
}

// Функция: создать карточку со слушателями

const getItemElement = card => {
  const newItemElement = template.content.cloneNode(true);
  const newItemPhoto = newItemElement.querySelector('.element__photo');
  const newItemPlaceName = newItemElement.querySelector('.element__place-name');
  const deleteButton = newItemElement.querySelector('.delete-button');
  const likeButton = newItemElement.querySelector('.like-button');
  newItemPhoto.src = card.link;
  newItemPhoto.alt = `Фото ${card.name}`;
  newItemPlaceName.textContent = card.name;
  deleteButton.addEventListener('click', handleDeleteItem);
  likeButton.addEventListener('click', handleLikeItem);
  newItemPhoto.addEventListener('click', () => {
    handleViewPhoto(card)
  });
  return newItemElement;
}

// Функция: рендерить карточки

const renderItemAppend = (wrap, card) => {
  wrap.append(getItemElement(card));
}

const renderItemPrepend = (wrap, card) => {
  wrap.prepend(getItemElement(card));
}

// Произвести рендеринг карточек через входящий массив

initialCards.forEach(card => {
  renderItemAppend(itemCardsWrapper, card);
})

//Функция: сбросить ошибки

const resetError = (popupObject) => {
  const errorList = Array.from(popupObject.querySelectorAll('.popup__error'))
    errorList.forEach((errorElement) => {
    errorElement.classList.remove('popup__error_visible');
  })
  const inputList = Array.from(popupObject.querySelectorAll('.popup__input'))
  inputList.forEach((inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
  })
}

//Функция: активировать кнопку

const activateButton = (popupObject) => {
  const buttonSubmit = popupObject.querySelector('.popup__button')
  buttonSubmit.classList.remove('popup__button_disabled');
  buttonSubmit.removeAttribute('disabled');
}

// Функции: установить слушатель события нажатия на кнопку Esc

const pressButtonEsc = evt => {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened')
    console.log('Нажали на Esc')
    closePopup(popupOpen)
 }
}

// Функции: открыть и закрыть Popup

const openPopup = popupObject => {
  popupObject.classList.add('popup_opened');
  document.addEventListener('keydown', pressButtonEsc);
}

const closePopup = popupObject => {
  popupObject.classList.remove('popup_opened');
  resetError(popupObject);
  document.removeEventListener('keydown', pressButtonEsc);
}

// Функция: редактирoвать профиль

buttonEditProfile.addEventListener('click', evt => {
  formPersonName.value = profilePersonName.textContent;
  formDescription.value = profileDescription.textContent;
  openPopup(popupEditProfile);
  activateButton(popupEditProfile);
});

popupFormEditProfile.addEventListener('submit', evt => {
  evt.preventDefault();
  profilePersonName.textContent = formPersonName.value;
  profileDescription.textContent = formDescription.value;
  closePopup(popupEditProfile);
});

// Функция: добавить новые фотокарточки

buttonAddCard.addEventListener('click', evt => {
  popupFormAddCard.reset();
  openPopup(popupAddCard);
});

popupFormAddCard.addEventListener('submit', evt => {
  evt.preventDefault();
  newCard = {name: formPlaceName.value, link: formLink.value}
  renderItemPrepend(itemCardsWrapper, newCard);
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
  popup.addEventListener('click', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.target)
    }
  })
})

