import {initialCard, cardContainer} from "./utils";
import {closePopup} from "./modal";
import {openPopup} from "./modal";

/*const cardContainer = document.querySelector('.card-grid');*/
const cardTemplate = document.querySelector('#itemTemplate').content;

const popupZoom = document.querySelector('.popup_type_zoom');
const imgPopupZoom = popupZoom.querySelector('.zoom__photo');
const titlePopupZoom = popupZoom.querySelector('.zoom__caption');

const formPlace = document.forms["card-form"];
const titleInputFormPlace = formPlace.querySelector('[name="title"]');
const linkInputFormPlace = formPlace.querySelector('[name="link-img"]');
const popupPlace = document.querySelector('.popup_type_place');


/**
 * ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ МЕСТА ПО ШАБЛОНУ
 *
 *  @param {string} srcValue - ссылка на изображение
 *  @param {string} titleValue - наименование места
 */
function getCard(srcValue, titleValue) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__photo');
  cardImage.src = srcValue;
  cardImage.alt = `Визуальное отображение места - ${titleValue}`;
  cardElement.querySelector('.card__title').textContent = titleValue;
  return cardElement
}

/**
 * ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ
 *
 *  @param {string} srcValue - ссылка на изображение
 *  @param {string} titleValue - наименование места
 */
function createCard(srcValue, titleValue) {
  const cardElement = getCard(srcValue, titleValue)
  cardContainer.prepend(cardElement)
};

/**
 * ЦИКЛ ОБРАБОТКИ НАЧАЛЬНЫХ КАРТОЧЕК МЕСТ
 */
initialCard.forEach(function (card) {
  createCard(card.link, card.name);
});

/*
 * ФУНКЦИЯ ИЗМЕНЕНИЯ ПОВЕДЕНИЯ SUBMIT ФОРМЫ В ПОПАПЕ PLACE
 */
function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  createCard(linkInputFormPlace.value, titleInputFormPlace.value);
  evt.target.reset()
  closePopup(popupPlace);
};


/**
 * Функция открывает модальное окно просмотра изображения заполняя атрибуты блока <img> и
 * текст блока <figcaption> значениями переданными в параметрах
 * @param {String} srcValue - ссылка на изображение
 * @param {String} titleValue - ссылка на изображение
 */
function openZoom(srcValue, titleValue) {
  imgPopupZoom.setAttribute('alt', titleValue);
  imgPopupZoom.setAttribute('src', srcValue);
  titlePopupZoom.textContent = titleValue.slice('Визуальное отображение места - '.length - 1);
  openPopup(popupZoom)
};


/**
 * Функция удаляет элемент (родитель с классом card) для элемента переданного параметром
 *  @param {Element} buttonTrash - дом элемент кнопка удаления карточки
 */
function deleteCard(buttonTrash) {
  const card = buttonTrash.closest('.card');
  card.remove();
};

/**
 * Функция переключает класс активности у элемента переданного параметром
 * @param {Element} like - элемент лайк
 */
function toggleLike(like) {
  like.classList.toggle('card__like_active');
};

/**
 * Функция-диспетчер события нажатия на карточку.
 * Определяет обработку события в зависимости от класса target:
 * card\_\_like, card\_\_trash или card\_\_photo
 * @param {Event} evt - событие нажатия клика на карточку
 */
function handleCardClickGeneral(evt) {
  const evTarget = evt.target;
  if (evTarget.classList.contains('card__like')) {
    toggleLike(evTarget);
  } else if (evTarget.classList.contains('card__trash')) {
    deleteCard(evTarget);
  } else if (evTarget.classList.contains('card__photo')) {
    openZoom(evTarget.src,evTarget.alt);
  }
};

export {handleFormSubmitPlace, formPlace, popupPlace, handleCardClickGeneral};