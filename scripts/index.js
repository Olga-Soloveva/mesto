let popup = document.querySelector('.popup');

function editButtonClick() {
  popup.classList.toggle('popup_opened');
}

let editButton = document.querySelector('.edit-button');
editButton.addEventListener('click', editButtonClick);

let popupClose = document.querySelector('.popup__close');
popupClose.addEventListener('click', editButtonClick);

let popupForm = document.querySelector('.popup__form')

function formSubmitHandler (evt) {
  evt.preventDefault();
  let formName = document.querySelector('.popup__form-item_el_name');
  let formDescription = document.querySelector('.popup__form-item_el_description');
  let formNameValue = formName.value;
  let formDescriptionValue = formDescription.value;

  let profilePersonName = document.querySelector('.profile__person-name');
  let profileDescription = document.querySelector('.profile__description');
  profilePersonName.textContent = formNameValue;
  profileDescription.textContent = formDescriptionValue;

  editButtonClick()
}

popupForm.addEventListener('submit', formSubmitHandler);
