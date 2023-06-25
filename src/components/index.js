/**
 * ИМПОРТЫ
 */
import '/src/pages/index.css'; // импорт главного файла стилей
import {showError} from "./utils";
import {
  formProfile,
  popupPlace,
  formPlace,
  formDelete,
  formAvatar,
  popupAvatar,
  nameUser,
  statusUser, avatar,
} from "./constants"
import {openPopup, closePopup} from './modal.js';
import {checkErrorsForm, enableValidation,} from "./validate";
import {buildCards, createCard, removeCard, popupDelete,} from "./сard";
import {api} from "./apiOOP";

/**
 * КОНСТАНТЫ
 */
let userID = null;
const openingButtonPopupProfile = document.querySelector('.profile__button-edit');
const openingButtonPopupPlace = document.querySelector('.profile__button-add');
const openingButtonPopupAvatar = document.querySelector('.profile__avatar-button')
const popupProfile = document.querySelector('.popup_type_profile');
const inputNameFormProfile = formProfile.querySelector('[name="user-name"]');
const inputStatusFormProfile = formProfile.querySelector('[name="user-status"]');
const inputTitleFormPlace = formPlace.querySelector('[name="title"]');
const inputLinkFormPlace = formPlace.querySelector('[name="link-img"]');
const inputLinkFormAvatar = formAvatar.querySelector('[name="link-avatar"]');

const selectorsForValid = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_active'
};

/**
 * Функция __fillProfile()__ заполняет поля профиля на страничке
 *  @param {string} name - имя юзера
 *  @param {string} about - значение информации о юзере
 */
function fillProfile(name, about) {
  nameUser.textContent = name;
  statusUser.textContent = about;
}

/**
 * Функция __insertAvatar()__ вставляет аватарку пользователя
 *  @param {string} linkAvatar - ссылка на аватар
 */
function insertAvatar(linkAvatar) {
  avatar.src = linkAvatar;
}

/**
 * Функция __renderLoading()__ универсальная функция управления текстом кнопки
 * @param {boolean} isLoading - признак загрузки
 * @param {element} button - кнопка Submit
 * @param {string} buttonText - исходный текст кнопки
 * @param {string} loadingText - текст кнопки для визуализации загрузки
 */
function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
  if (isLoading) {
    button.disabled = isLoading
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}

/**
 * Функция __handleSubmit()__ универсальная функция принимает функцию запроса, объект события и текст во время загрузки
 * @param {request} request - функция запроса к API
 * @param {event} evt - событие Submit
 * @param {string} loadingText - текст кнопки для визуализации загрузки
 */
function handleSubmit(request, evt, loadingText = 'Сохранение...') {
  // всегда нужно предотвращать перезагрузку формы при сабмите
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);

    });
}

/**
 * Функция __handleSubmitFormPlace()__ функция обработки кнопки Submit формы Place.
 * Создает запрос и передает его в универсальную функцию
 * @param {event} evt - событие Submit
 */
function handleSubmitFormPlace(evt) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
  function makeRequest() {
    // return позволяет потом дальше продолжать цепочку `then, catch, finally`
    return api.sendNewCardOOP(inputLinkFormPlace.value, inputTitleFormPlace.value)
      .then(data => {
        createCard(data, userID, false);
        closePopup(popupPlace);
      })
  }

  handleSubmit(makeRequest, evt);
}

/**
 * Функция __handleSubmitFormAvatar()__ функция обработки кнопки Submit формы Avatar.
 * Создает запрос и передает его в универсальную функцию
 * @param {event} evt - событие Submit
 */
function handleSubmitFormAvatar(evt) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
  function makeRequest() {
    // return позволяет потом дальше продолжать цепочку `then, catch, finally`
    return api.sendAvatarOOP(inputLinkFormAvatar.value)
      .then(data => {
        insertAvatar(data.avatar);
        closePopup(popupAvatar);
      })
  }

  handleSubmit(makeRequest, evt);
}

/**
 * Функция __handleSubmitFormProfile()__ функция обработки кнопки Submit формы Profile.
 * Создает запрос и передает его в универсальную функцию.
 * @param {event} evt - событие Submit
 */
function handleSubmitFormProfile(evt) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
  function makeRequest() {
    // return позволяет потом дальше продолжать цепочку `then, catch, finally`
    return api.sendProfileOOP(inputNameFormProfile.value, inputStatusFormProfile.value)
      .then((user) => {
        closePopup(popupProfile)
        fillProfile(user.name, user.about);
      });
  }

  handleSubmit(makeRequest, evt);
}


/**
 * Функция __handleSubmitFormDelete()__ функция обработки кнопки Submit формы Delete.
 * Создает запрос и передает его в универсальную функцию.
 * @param {event} evt - событие Submit
 */
function handleSubmitFormDelete(evt) {
  const cardID = evt.submitter.value;

  function makeRequest() {
    return api.sendCardDeletionOOP(cardID)    // return позволяет потом дальше продолжать цепочку `then, catch, finally`
      .then((res) => {
        console.log(res.message)
        removeCard();
        closePopup(popupDelete);
      })
  }

  handleSubmit(makeRequest, evt, 'Удаление...');
}


/**
 * Функция __openProfilePopup()__ запускает процедуру открытия модального окна профайл
 * */
function openProfilePopup() {
  inputNameFormProfile.value = nameUser.textContent;
  inputStatusFormProfile.value = statusUser.textContent;
  checkErrorsForm(formProfile, selectorsForValid);
  openPopup(popupProfile);
};

/**
 * Функция __openPlacePopup()__ запускает процедуру открытия модального окна добавления карточки
 * */
function openPlacePopup() {
  checkErrorsForm(formPlace, selectorsForValid);
  openPopup(popupPlace);
}

/**
 * Функция __openAvatarPopup()__ запускает процедуру открытия модального окна изменения аватарки
 * */
function openAvatarPopup() {
  checkErrorsForm(formAvatar, selectorsForValid);
  openPopup(popupAvatar);
}

function openDelete() {
  checkErrorsForm(formDelete, selectorsForValid);
  openPopup(popupDelete);
}

/**
 * Функция __buildPage()__ строит страничку
 */
function buildPage() {
  api.getTotalInfoOOP()
    .then(([userData, cardsData]) => {
      console.log(userData)
      console.log(cardsData)
      userID = userData._id;
      fillProfile(userData.name, userData.about);
      insertAvatar(userData.avatar);
      buildCards(cardsData, userID);
    })
    .catch(showError)
}

/**
 * СЛУШАТЕЛИ
 * */
openingButtonPopupProfile.addEventListener('click', openProfilePopup);
openingButtonPopupPlace.addEventListener('click', openPlacePopup);
openingButtonPopupAvatar.addEventListener('click', openAvatarPopup);

formProfile.addEventListener('submit', handleSubmitFormProfile);
formPlace.addEventListener('submit', handleSubmitFormPlace);
formAvatar.addEventListener('submit', handleSubmitFormAvatar);
formDelete.addEventListener('submit', handleSubmitFormDelete);

/**
 * ВЫЗОВЫ ФУНКЦИИ ДЛЯ ВАЛИДАЦИИ И ОТРИСОВКИ СТРАНИЧКИ
 * */
enableValidation(selectorsForValid);
buildPage();

export {userID, openDelete}