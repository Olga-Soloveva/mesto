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
const template = document.querySelector('#template-photo');

//Функции карточек (лайк и удалить карточку)

const handleLikeItem = evt => {
  evt.target.classList.toggle('like-button_active');
}

const handleDeleteItem = evt => {
  const deleteCard = evt.target.closest('.element');
  deleteCard.remove();
}

// Посмотреть фотографию на полный экран

const popupViewCard = document.querySelector('.popup_type_open-card');

const handleViewPhoto = evt => {
  openForm(popupViewCard);
  const popupImg = popupViewCard.querySelector('.popup__card')
  popupImg.src = evt.target.src
  const popupImgName = popupViewCard.querySelector('.popup__card-name')
  const cardElement = evt.target.closest('.element');
  const cardPlaceName = cardElement.querySelector('.element__place-name')
  popupImgName.textContent = cardPlaceName.textContent

}

// Рендер массива в карточки


const getItemElement = card => {
  const newItemElement = template.content.cloneNode(true);
  const newItemPhoto = newItemElement.querySelector('.element__photo');
  newItemPhoto.src = card.link;
  newItemPhoto.alt = `Фото ${card.name}`;
  newItemPhoto.addEventListener('click', handleViewPhoto)

  const newItemPlaceName = newItemElement.querySelector('.element__place-name');
  newItemPlaceName.textContent = card.name;
  const newItemLikeButton = newItemElement.querySelector('.like-button');
  newItemLikeButton.addEventListener('click', handleLikeItem)
  const newDeleteButton = newItemElement.querySelector('.delete-button')
  newDeleteButton.addEventListener('click', handleDeleteItem)

  return newItemElement;
}

const renderItemAppend = (wrap, card) => {
  wrap.append(getItemElement(card));
}

const renderItemPrepend = (wrap, card) => {
  wrap.prepend(getItemElement(card));
}

initialCards.forEach(card => {
  renderItemAppend(itemCardsWrapper, card);
})


// Функции открытия и закрытие Popup

const openForm = popupObject => {
  popupObject.classList.add('popup_opened');
  const popupClose = popupObject.querySelector('.popup__close')
  popupClose.addEventListener('click', evt => {
    closePopup(evt);
  })
}

const closePopup = evt => {
  elPopup = evt.target.closest('.popup');
  elPopup.classList.remove('popup_opened');
}

// Редактирoвание профиля

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editButton = document.querySelector('.edit-button');

const formPersonName = popupEditProfile.querySelector('.popup__form-item_el_name');
const formDescription = popupEditProfile.querySelector('.popup__form-item_el_description');
const profilePersonName = document.querySelector('.profile__person-name');
const profileDescription = document.querySelector('.profile__description');

editButton.addEventListener('click', evt => {
  formPersonName.value = profilePersonName.textContent;
  formDescription.value = profileDescription.textContent;
  openForm(popupEditProfile);
});


const popupFormEditProfile = document.querySelector('.popup_type_edit-profile .popup__form')
popupFormEditProfile.addEventListener('submit', evt => {
  evt.preventDefault();
  profilePersonName.textContent = formPersonName.value;
  profileDescription.textContent = formDescription.value;
  closePopup(evt)
});


// Добавление новой фотокарточки

const popupAddCard = document.querySelector('.popup_type_add-card');
const addButton = document.querySelector('.add-button');

const formPlaceName = popupAddCard.querySelector('.popup__form-item_el_place');
const formLink = popupAddCard.querySelector('.popup__form-item_el_link');

addButton.addEventListener('click', evt => {
  formPlaceName.value = '';
  formLink.value = '';
  openForm(popupAddCard);
});

const popupFormAddCard = document.querySelector('.popup_type_add-card .popup__form')
popupFormAddCard.addEventListener('submit', evt => {
  evt.preventDefault();
  renderItemPrepend(itemCardsWrapper, ({name: formPlaceName.value, link: formLink.value}));
  formPlaceName.value = '';
  formLink.value = '';
  closePopup(evt)
});


