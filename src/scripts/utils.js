import khabImage from '/src/images/хабаровск.jpg';
import svobImage from '/src/images/свободный.jpg';
import vladImage from '/src/images/владивосток.png';
import blagImage from '/src/images/благовещенск.jpg';
import mosImage from '/src/images/москва.png';
import kazImage from '/src/images/казань.jpg';

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

/** @constant
 *     @type {object}
 */
const classSelectorsForValid = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const formProfile = document.forms["profile-form"];

const cardContainer = document.querySelector('.card-grid');

export {initialCard, classSelectorsForValid, cardContainer, formProfile};