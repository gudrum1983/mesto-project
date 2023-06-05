//ИМПОРТЫ

import '/src/pages/index.css'; // импорт главного файла стилей
import {selectorsForValid, formProfile, popupPlace, formPlace} from "./utils";
import {openPopup, closePopup} from './modal.js';
import {clearErrorsForm, enableValidation} from "./validate";
import {createCard} from "./сard";

//КОНСТАНТЫ

const openPopupProfileButton = document.querySelector('.profile__button-edit');
const openPopupPlaceButton = document.querySelector('.profile__button-add');
const profileUser = document.querySelector('.profile');
const nameUser = profileUser.querySelector('.profile__name');
const statusUser = profileUser.querySelector('.profile__status');
const nameInputFormProfile = formProfile.querySelector('[name="user-name"]');
const statusInputFormProfile = formProfile.querySelector('[name="user-status"]');
const popupProfile = document.querySelector('.popup_type_profile');
const titleInputFormPlace = formPlace.querySelector('[name="title"]');
const linkInputFormPlace = formPlace.querySelector('[name="link-img"]');

/**
 * Функция __handleFormSubmitPlace()__ изменяет поведение кнопки сабмит
 * в попапе место
 * @param {Event} evt - событие
 */
function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  createCard(linkInputFormPlace.value, titleInputFormPlace.value);
  evt.target.reset();
  const buttonSubmit = evt.submitter;
  buttonSubmit.disabled = true;
  buttonSubmit.classList.add(selectorsForValid.inactiveButtonClass);
  closePopup(popupPlace);
};

/**
 * Функция __handleFormSubmitProfile()__ изменяет поведение кнопки сабмит
 * в попапе профайл
 * @param {Event} evt - событие
 */
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  nameUser.textContent = nameInputFormProfile.value; //
  statusUser.textContent = statusInputFormProfile.value;
  closePopup(popupProfile)
};

/**
 * Функция __openProfilePopup()__ запускает процедуру открытия попапа профайл
 * */
function openProfilePopup() {
  nameInputFormProfile.value = nameUser.textContent;
  statusInputFormProfile.value = statusUser.textContent;
  clearErrorsForm(formProfile, selectorsForValid);
  openPopup(popupProfile);
};

//СЛУШАТЕЛИ

openPopupProfileButton.addEventListener('click', openProfilePopup);
openPopupPlaceButton.addEventListener('click', () => openPopup(popupPlace));
formProfile.addEventListener('submit', handleFormSubmitProfile);
formPlace.addEventListener('submit', handleFormSubmitPlace);

//ВЫЗОВ ФУНКЦИИ ДЛЯ ВАЛИДАЦИИ

enableValidation(selectorsForValid);