//ИМПОРТЫ

import {isValid, toggleButtonState} from "./validate";
import {selectorsForValid, formProfile, popupPlace, formPlace} from "./utils";
import {createCard} from "./сard";

//КОНСТАНТЫ

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
  debugger;
  evt.target.reset()
  closePopup(popupPlace);
};


/**
 * Функция __closePopup()__ закрывает попап
 * @param {Element} popup - попап
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', keyHandler);
};

/**
 * Функция __keyHandler()__ запускает закрытие попапа по кнопке ESC
 * @param {Event} evt - событие
 */
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
  ;
};

/**
 * Функция __clickHandler()__ запускает закрытие попапа по клику на оверлей
 * @param {Event} evt - событие
 */
function clickHandler(evt) {
  const evTarget = evt.target;
  if (evTarget.classList.contains('popup__shadow') || evTarget.classList.contains('popup__button-close')) {
    closePopup(evt.currentTarget);
  }
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
 * Функция __openPopup()__ открывает попап
 * @param {Element} popup - событие
 */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', keyHandler);
  popup.addEventListener('click', clickHandler);
};


/**
 * Функция __clearErrorsPopup()__ очищает форму от ошибок и восстанавивает
 * стиль кнопки сабмит по умолчанию
 * @param {Element} formElement - форма
 * @param {Object} parameters - parameters – объект с перечислением селекторов классов для подставновки
 * классов и поиска элементов по классам
 */
function clearErrorsForm(formElement, parameters) {
  const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
  const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
  inputList.forEach((inputElement) => {
    isValid(formElement, inputElement, parameters);
    toggleButtonState(inputList, buttonElement, parameters);
  });
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

//ЕКСПОРТ

export {openPopup, closePopup, handleFormSubmitProfile, openProfilePopup, handleFormSubmitPlace};