let popup = document.querySelector('.popup');
let formName = document.querySelector('.popup__form-item_el_name');
let formDescription = document.querySelector('.popup__form-item_el_description');
let profilePersonName = document.querySelector('.profile__person-name');
let profileDescription = document.querySelector('.profile__description');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function openForm() {
  formName.value = profilePersonName.textContent;
  formDescription.value =  profileDescription.textContent;
  togglePopup();
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profilePersonName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;
  togglePopup();
}

let popupClose = document.querySelector('.popup__close');
popupClose.addEventListener('click', togglePopup);

let editButton = document.querySelector('.edit-button');
editButton.addEventListener('click', openForm);

let popupForm = document.querySelector('.popup__form')
popupForm.addEventListener('submit', formSubmitHandler);
