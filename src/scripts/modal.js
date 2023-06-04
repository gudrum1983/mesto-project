import {isValid, toggleButtonState} from "./validate";
import {classSelectorsForValid, formProfile} from "./utils";

const profileUser = document.querySelector('.profile');
const nameUser = profileUser.querySelector('.profile__name');
const statusUser = profileUser.querySelector('.profile__status');



const nameInputFormProfile = formProfile.querySelector('[name="user-name"]');
const statusInputFormProfile = formProfile.querySelector('[name="user-status"]');
const popupProfile = document.querySelector('.popup_type_profile');



//*************************************************************************************************
//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА
//*************************************************************************************************
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', keyHandler);
};
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА КНОПКУ ESC
//*************************************************************************************************
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА НА ОВЕРЛЕЙ
//*************************************************************************************************
function clickHandler(evt) {
  const evTarget = evt.target;
  if (evTarget.classList.contains('popup__shadow') || evTarget.classList.contains('popup__button-close')) {
    closePopup(evt.currentTarget);
  }

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
  popup.addEventListener('click', clickHandler);
};
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА ФОРМЫ + СЛУШАТЕЛЬ
//*************************************************************************************************
function openProfilePopup() {
  const rer = popupProfile.querySelector('.form');
  nameInputFormProfile.value = nameUser.textContent;
  statusInputFormProfile.value = statusUser.textContent;
  const inputList = Array.from(rer.querySelectorAll('.form__input'));
  const buttonElement = rer.querySelector('.form__button-submit');
  isValid(rer, nameInputFormProfile, classSelectorsForValid);
  isValid(rer, statusInputFormProfile, classSelectorsForValid);
  toggleButtonState(inputList, buttonElement, classSelectorsForValid);
  openPopup(popupProfile);
};

///////////////////////////////////////////////////////////////////////////////////////////////////


export {openPopup, closePopup, handleFormSubmitProfile, openProfilePopup, formProfile,};