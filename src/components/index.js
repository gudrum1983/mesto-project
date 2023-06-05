//ИМПОРТЫ

import '/src/pages/index.css'; // импорт главного файла стилей
import {selectorsForValid, cardContainer, formProfile, popupPlace, formPlace} from "./utils";
import {openPopup, handleFormSubmitProfile, openProfilePopup, handleFormSubmitPlace} from './modal.js';
import {handleCardClickGeneral} from './сard.js';
import {enableValidation} from "./validate";

//КОНСТАНТЫ

const openPopupProfileButton = document.querySelector('.profile__button-edit');
const openPopupPlaceButton = document.querySelector('.profile__button-add');

//СЛУШАТЕЛИ

openPopupProfileButton.addEventListener('click', openProfilePopup);
openPopupPlaceButton.addEventListener('click', () => openPopup(popupPlace));
formProfile.addEventListener('submit', handleFormSubmitProfile);
formPlace.addEventListener('submit', handleFormSubmitPlace);
cardContainer.addEventListener('click', handleCardClickGeneral)

//ВЫЗОВ ФУНКЦИИ ДЛЯ ВАЛИДАЦИИ

enableValidation(selectorsForValid);