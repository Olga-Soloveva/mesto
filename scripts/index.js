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

const popupViewCard = document.querySelector('.popup_type_open-card');
const popupImg = popupViewCard.querySelector('.popup__card');
const popupImgName = popupViewCard.querySelector('.popup__card-name');


const popupAddCard = document.querySelector('.popup_type_add-card');
const popupFormAddCard = popupAddCard.querySelector('.popup__form');
const formPlaceName = popupAddCard.querySelector('.popup__form-item_el_place');
const formLink = popupAddCard.querySelector('.popup__form-item_el_link');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupFormEditProfile = popupEditProfile.querySelector('.popup__form');
const formPersonName = popupEditProfile.querySelector('.popup__form-item_el_name');
const formDescription = popupEditProfile.querySelector('.popup__form-item_el_description');

const buttonEditProfile = document.querySelector('.edit-button');
const buttonAddCard = document.querySelector('.add-button');
const buttonsPopupClose = document.querySelectorAll('.popup__close');

//Функции карточек (лайк и удалить карточку)

const handleLikeItem = evt => {
  evt.target.classList.toggle('like-button_active');
}

const handleDeleteItem = evt => {
  const deleteCard = evt.target.closest('.element');
  deleteCard.remove();
}

// Посмотреть фотографию на полный экран

const handleViewPhoto = (card) => {
  openPopup(popupViewCard);
  popupImg.src = card.link;
  popupImg.alt = `Фото ${card.name}`;
  popupImgName.textContent = card.name;
}

// Создание карточки со слушателями

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

// Функции рендеринга карточек

const renderItemAppend = (wrap, card) => {
  wrap.append(getItemElement(card));
}

const renderItemPrepend = (wrap, card) => {
  wrap.prepend(getItemElement(card));
}

// Рендеринг карточек через входящий массив

initialCards.forEach(card => {
  renderItemAppend(itemCardsWrapper, card);
})

// Функции открытия и закрытие Popup

const openPopup = popupObject => {
  popupObject.classList.add('popup_opened');
}

const closePopup = popupObject => {
  popupObject.classList.remove('popup_opened');
}

// Редактирoвание профиля

buttonEditProfile.addEventListener('click', evt => {
  formPersonName.value = profilePersonName.textContent;
  formDescription.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

popupFormEditProfile.addEventListener('submit', evt => {
  evt.preventDefault();
  profilePersonName.textContent = formPersonName.value;
  profileDescription.textContent = formDescription.value;
  closePopup(popupEditProfile);
});

// Добавление новой фотокарточки

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

// Добавление слушателя на все кнопки закрытия Popup

buttonsPopupClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup)
  })
});
