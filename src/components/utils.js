//ИМПОРТЫ

import khabImage from '/src/images/хабаровск.jpg';
import svobImage from '/src/images/свободный.jpg';
import vladImage from '/src/images/владивосток.png';
import blagImage from '/src/images/благовещенск.jpg';
import mosImage from '/src/images/москва.png';
import kazImage from '/src/images/казань.jpg';

//КОНСТАНТЫ

const initialCard = [
  {
    name: 'Хабаровск',
    link: khabImage
  },
  {
    name: 'Свободный',
    link: svobImage
  },
  {
    name: 'Владивосток',
    link: vladImage
  },
  {
    name: 'Благовещенск',
    link: blagImage
  },
  {
    name: 'Москва',
    link: mosImage
  },
  {
    name: 'Казань',
    link: kazImage
  }
];

const selectorsForValid = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_active'
};
const formProfile = document.forms["profile-form"];
const cardContainer = document.querySelector('.card-grid');
const popupPlace = document.querySelector('.popup_type_place');
const formPlace = document.forms["card-form"];


//ЭКСПОРТ

export {initialCard, selectorsForValid, cardContainer, formProfile, popupPlace, formPlace};