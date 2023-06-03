import {isValid, toggleButtonState} from "./validate";
import {Words} from "./index";

const profileUser = document.querySelector('.profile');
const nameUser = profileUser.querySelector('.profile__name');
const statusUser = profileUser.querySelector('.profile__status');

const formProfile = document.forms["profile-form"];

const nameInputFormProfile = formProfile.querySelector('[name="user-name"]');
const statusInputFormProfile = formProfile.querySelector('[name="user-status"]');
const popupProfile = document.querySelector('.popup_type_profile');



//*************************************************************************************************
//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА
//*************************************************************************************************
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА КНОПКУ ESC
//*************************************************************************************************
function keyHandler(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  };
};
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА НА ОВЕРЛЕЙ
//*************************************************************************************************
function clickHandler(evt) {
  const popupOpened = document.querySelector('.popup_opened')
  closePopup(popupOpened);
};
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ИЗМЕНЕНИЯ ПОВЕДЕНИЯ SUBMIT ФОРМЫ В ПОПАПЕ PROFILE + СЛУШАТЕЛЬ
//*************************************************************************************************
function handleFormSubmitProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameUser.textContent = nameInputFormProfile.value; //
  statusUser.textContent = statusInputFormProfile.value;
  closePopup(popupProfile)
};
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА ФОРМЫ + СЛУШАТЕЛЬ
//*************************************************************************************************
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', keyHandler);
  const overlay = popup.querySelector('.popup__shadow')
  overlay.addEventListener('click', clickHandler);
};
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА ФОРМЫ + СЛУШАТЕЛЬ
//*************************************************************************************************
function openProfilePopup() {
  const rer = popupProfile.querySelector('.form');
  const rerForm = rer.querySelector('.form__admin')
  rerForm.reset();
  nameInputFormProfile.value = nameUser.textContent;
  statusInputFormProfile.value = statusUser.textContent;
  const inputList = Array.from(rer.querySelectorAll('.form__input'));
  const buttonElement = rer.querySelector('.form__button-submit');
  isValid(rer, nameInputFormProfile, Words);
  isValid(rer, statusInputFormProfile, Words);
  toggleButtonState(inputList, buttonElement, Words);
  openPopup(popupProfile);
};
///////////////////////////////////////////////////////////////////////////////////////////////////

export {openPopup, closePopup, handleFormSubmitProfile, openProfilePopup, formProfile};