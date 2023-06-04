//*************************************************************************************************
//ИМПОРТЫ
//*************************************************************************************************
import '/src/pages/index.css'; // импорт главного файла стилей
import {classSelectorsForValid, cardContainer, formProfile} from "./utils";
import {openPopup, handleFormSubmitProfile, openProfilePopup} from './modal.js';
import {handleFormSubmitPlace, formPlace, popupPlace, handleCardClickGeneral} from './сard.js';
import {enableValidation} from "./validate";
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//КОНСТАНТЫ
//*************************************************************************************************
const openPopupProfileButton = document.querySelector('.profile__button-edit');
const openPopupPlaceButton = document.querySelector('.profile__button-add');
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * СЛУШАТЕЛИ:
 *
 * 1) НА КНОПКУ ОТКРЫТИЯ ПОПАПА ПРОФАЙЛ
 *
 * 2) НА КНОПКУ ОТКРЫТИЯ ПОПАПА МЕСТО
 *
 * 4) НА КНОПКУ САБМИТ ПРОФАЙЛ = ИЗМЕНЕНИЕ ПОВЕДЕНИЯ SUBMIT ФОРМЫ В ПОПАПЕ ПРОФАЙЛ
 *
 * 5) НА КНОПКУ САБМИТ МЕСТО = ИЗМЕНЕНИЕ ПОВЕДЕНИЯ SUBMIT ФОРМЫ В ПОПАПЕ МЕСТО
 *
 * 2) НА КОНТЕЙНЕР КАРТОЧЕК ДЛЯ ЛАЙКА
 *
 * 4) НА КОНТЕЙНЕР КАРТОЧЕК ДЛЯ УДАЛЕНИЯ КАРТОЧКИ
 *
 * 5) НА КОНТЕЙНЕР КАРТОЧЕК ДЛЯ ОТКРЫТИЯ ПОПАПА ЗУМ
 */

openPopupProfileButton.addEventListener('click', openProfilePopup);
openPopupPlaceButton.addEventListener('click', () => openPopup(popupPlace));
formProfile.addEventListener('submit', handleFormSubmitProfile);
formPlace.addEventListener('submit', handleFormSubmitPlace);

cardContainer.addEventListener('click', handleCardClickGeneral)

/**
 * Вызов функции валидации полей форм
 */
enableValidation(classSelectorsForValid);

