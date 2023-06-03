import khabImage from '/images/хабаровск.jpg';
import svobImage from '/images/свободный.jpg';
import vladImage from '/images/владивосток.png';
import blagImage from '/images/благовещенск.jpg';
import mosImage from '/images/москва.png';
import kazImage from '/images/казань.jpg';

import {closePopup} from "./modal";
import {openPopup} from "./modal";

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

const cardContainer = document.querySelector('.card-grid');
const cardTemplate = document.querySelector('#itemTemplate').content;
const popupZoom = document.querySelector('.popup_type_zoom');
const imgPopupZoom = popupZoom.querySelector('.zoom__photo');
const titlePopupZoom = popupZoom.querySelector('.zoom__caption');

const formPlace = document.forms["card-form"];
const titleInputFormPlace = formPlace.querySelector('[name="title"]');
const linkInputFormPlace = formPlace.querySelector('[name="link-img"]');
const popupPlace = document.querySelector('.popup_type_place');

//*************************************************************************************************
//ФУНКЦИЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА УВЕЛИЧЕНИЯ ИЗОБРАЖЕНИЯ КАРТОЧКИ МЕСТА
//*************************************************************************************************
function handleCardClick(srcValue, titleValue) {
  imgPopupZoom.setAttribute('alt', `Визуальное отображение места - ${titleValue}`);
  imgPopupZoom.setAttribute('src', srcValue);
  titlePopupZoom.textContent = titleValue;
  openPopup(popupZoom)
};
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ АКТИВНОСТИ ЛАЙКА
//*************************************************************************************************
function toggleLike(evt) {
  const buttonHeart = evt.target;
  buttonHeart.classList.toggle('icon-heart_active');
};
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ МЕСТА ПО ШАБЛОНУ + СОЗДАНИЕ В ЦИКЛЕ НАЧАЛЬНЫХ КАРТОЧЕК
//*************************************************************************************************






//*************************************************************************************************
//ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ МЕСТА
//*************************************************************************************************
function deleteCard(evt) {
  const buttonDelete = evt.target;
  const card = buttonDelete.closest('.card');
  card.remove();
};
///////////////////////////////////////////////////////////////////////////////////////////////////



function getCard(srcValue, titleValue) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__photo');
  cardImage.src = srcValue;
  cardImage.alt = `Визуальное отображение места - ${titleValue}`;
  cardElement.querySelector('.card__title').textContent = titleValue;
  cardElement.querySelector('.card__like').addEventListener('click', toggleLike);
  cardImage.addEventListener('click', () => handleCardClick(srcValue, titleValue));
  cardElement.querySelector('.card__trash').addEventListener('click', deleteCard);
  return cardElement
}

function createCard(srcValue, titleValue) {
  const cardElement = getCard(srcValue, titleValue)
  cardContainer.prepend(cardElement)
};

initialCard.forEach(function (card) {
  const imgCard = card.link;
  const titleCard = card.name;
  createCard(imgCard, titleCard);
});


//*************************************************************************************************
//ФУНКЦИЯ ИЗМЕНЕНИЯ ПОВЕДЕНИЯ SUBMIT ФОРМЫ В ПОПАПЕ PLACE + СЛУШАТЕЛЬ
//*************************************************************************************************
function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  createCard(linkInputFormPlace.value, titleInputFormPlace.value);
  evt.target.reset()
  closePopup(popupPlace);
};
///////////////////////////////////////////////////////////////////////////////////////////////////

export {handleFormSubmitPlace, formPlace, popupPlace};