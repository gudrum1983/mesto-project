/**
 * ИМПОРТЫ
 */
import '/src/pages/index.css'; // импорт главного файла стилей
import {
  selectorsForValid,
  formProfile,
  popupPlace,
  formPlace,
  formDelete,
  formAvatar,
  popupAvatar,
  nameUser,
  statusUser, fillEntireProfile, showError, fillProfile, fillAvatar
} from "./utils";
import {openPopup, closePopup, closePopupUX} from './modal.js';
import {checkErrorsForm, enableValidation,} from "./validate";
import {sendProfile, sendNewCard, startDeleteCard, sendAvatar, getTotalInfo, result} from "./api";
import {buildCards, deleteCard} from "./сard";

/**
 * КОНСТАНТЫ
 */
let userID = null;
const openPopupProfileButton = document.querySelector('.profile__button-edit');
const openPopupPlaceButton = document.querySelector('.profile__button-add');
const openPopupAvatarButton = document.querySelector('.profile__avatar-button')
const nameInputFormProfile = formProfile.querySelector('[name="user-name"]');
const statusInputFormProfile = formProfile.querySelector('[name="user-status"]');
const popupProfile = document.querySelector('.popup_type_profile');
const titleInputFormPlace = formPlace.querySelector('[name="title"]');
const linkInputFormPlace = formPlace.querySelector('[name="link-img"]');
const linkInputFormAvatar = formAvatar.querySelector('[name="link-avatar"]');

/**
 * Функция __updateAvatar()__ отправляет данные о юзере и обновляет данные на страничке
 * @param {string} linkAvatar - ссылка на картинку
 * @param {element} buttonSubmit - - кнопка "сохранить"
 */
function updateAvatar(linkAvatar, buttonSubmit) {
  sendAvatar(linkAvatar, buttonSubmit)
    .then(data => {
      fillAvatar(data.avatar);
    })
    .catch((err) => {
      showError(err);
    })
    .finally(() => {
      closePopupUX(buttonSubmit);
    })
}

/**
 * Функция __handleFormSubmitAvatar()__ изменяет поведение кнопки сохранить
 * в модальном окне место
 * @param {Event} evt - событие
 */
function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...'
  evt.submitter.disabled = true;
  updateAvatar(linkInputFormAvatar.value, evt.submitter)
};

/**
 * Функция __addCard()__ отправляет данные о юзере и обновляет данные на страничке
 * @param {string} linkImgCard - ссылка на картинку карточки
 * @param {string} titleCard - название карточки
 * @param {element} buttonSubmit - кнопка сохранить
 */
function addCard(linkImgCard, titleCard, buttonSubmit) {
  sendNewCard(linkImgCard, titleCard)
    .then(result)
    .then(data => {
      buildCards([data], userID);
    })
    .catch((err) => {
      showError(err);
    })
    .finally(() => {
      closePopupUX(buttonSubmit);
    })
}

/**
 * Функция __handleFormSubmitPlace()__ изменяет поведение кнопки "сохранить"
 * в модальном окне место
 * @param {Event} evt - событие
 */
function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...'
  evt.submitter.disabled = true;
  addCard(linkInputFormPlace.value, titleInputFormPlace.value, evt.submitter);
};

/**
 * Функция __updateProfile()__ отправляет данные о юзере и обновляет данные на страничке
 * @param {string} nameUser - имя пользователя
 * @param {string} aboutUser - информация о пользователе
 * @param {element} buttonSubmit - кнопка сохранить
 */
function updateProfile(nameUser, aboutUser, buttonSubmit) {
  sendProfile(nameUser, aboutUser)
    .then(result)
    .then(user => {
      fillProfile(user.name, user.about)
    })
    .catch((err) => {
      showError(err);
    })
    .finally(() => {
      closePopupUX(buttonSubmit);
    })
}


/**
 * Функция __handleFormSubmitProfile()__ изменяет поведение кнопки "сохранить"
 * в модальном окне профайл
 * @param {Event} evt - событие
 */
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  if (nameUser.textContent !== nameInputFormProfile.value || statusUser.textContent !== statusInputFormProfile.value) {
    evt.submitter.textContent = 'Сохранение...';
    evt.submitter.disabled = true;
    updateProfile(nameInputFormProfile.value, statusInputFormProfile.value, evt.submitter);
  } else {
    closePopup(popupProfile)
  }
};

/**
 * Функция __removeCard()__ отправляет данные о юзере и обновляет данные на страничке
 * @param {string} cardID - идентификатор пользователя
 */
function removeCard(cardID) {
  startDeleteCard(cardID)
    .then(res => {
      debugger
      console.log(res)
      if (res.ok) {
        return deleteCard();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      showError(err);
    })
}

/**
 * Функция __handleFormSubmitDelete()__ изменяет поведение кнопки "сохранить"
 * в модальном окне на удаление карточки
 * @param {Event} evt - событие
 */
function handleFormSubmitDelete(evt) {
  evt.preventDefault();
  evt.submitter.disabled = false;
  const popup = evt.target.closest('.popup');
  const cardID = evt.submitter.value;
  removeCard(cardID);
  closePopup(popup)
};


/**
 * Функция __openProfilePopup()__ запускает процедуру открытия модального окна профайл
 * */
function openProfilePopup() {
  nameInputFormProfile.value = nameUser.textContent;
  statusInputFormProfile.value = statusUser.textContent;
  checkErrorsForm(formProfile, selectorsForValid);
  openPopup(popupProfile);
};

/**
 * Функция __openPlacePopup()__ запускает процедуру открытия модального окна добавления карточки
 * */
function openPlacePopup() {
  checkErrorsForm(formPlace, selectorsForValid)
  openPopup(popupPlace)
}

/**
 * СЛУШАТЕЛИ
 * */
openPopupProfileButton.addEventListener('click', openProfilePopup);
openPopupPlaceButton.addEventListener('click', openPlacePopup);
openPopupAvatarButton.addEventListener('click', () => openPopup(popupAvatar))
formProfile.addEventListener('submit', handleFormSubmitProfile);
formPlace.addEventListener('submit', handleFormSubmitPlace);
formDelete.addEventListener('submit', handleFormSubmitDelete);
formAvatar.addEventListener('submit', handleFormSubmitAvatar);

/**
 * ВЫЗОВ ФУНКЦИИ ДЛЯ ВАЛИДАЦИИ
 * */
enableValidation(selectorsForValid);

/**
 * Функция __buildPage()__ строит страничку
 */
function buildPage() {
  getTotalInfo()
    .then(([userData, cardsData]) => {
      console.log(userData)
      console.log(cardsData)
      userID = userData._id
      fillEntireProfile(userData);
      buildCards(cardsData.reverse(), userID);
    })
    .catch((err) => {
      showError(err);
    })
}


buildPage();

export {userID}
