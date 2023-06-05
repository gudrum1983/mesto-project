//ИМПОРТЫ

import {initialCard, cardContainer, popupPlace} from "./utils";
import {openPopup} from "./modal";

//КОНСТАНТЫ

const cardTemplate = document.querySelector('#itemTemplate').content;
const popupZoom = document.querySelector('.popup_type_zoom');
const imgPopupZoom = popupZoom.querySelector('.zoom__photo');
const titlePopupZoom = popupZoom.querySelector('.zoom__caption');

/**
 * Функция __getCard()__ создает карточку по шаблону
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
 * Функция __createCard()__ добавляет карточку в контейнер
 *  @param {string} srcValue - ссылка на изображение
 *  @param {string} titleValue - наименование места
 */
function createCard(srcValue, titleValue) {
  const cardElement = getCard(srcValue, titleValue)
  cardContainer.prepend(cardElement)
};

/**
 * Функция __openZoom()__ открывает модальное окно просмотра изображения
 * заполняя атрибуты блока <img> и текст блока <figcaption> значениями
 * переданными в параметрах
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
 * Функция __deleteCard()__ удаляет элемент (родитель с классом card)
 * для элемента переданного параметром
 *  @param {Element} buttonTrash - дом элемент кнопка удаления карточки
 */
function deleteCard(buttonTrash) {
  const card = buttonTrash.closest('.card');
  card.remove();
};

/**
 * Функция __toggleLike()__ переключает класс активности у элемента переданного параметром
 * @param {Element} like - элемент лайк
 */
function toggleLike(like) {
  like.classList.toggle('card__like_active');
};

/**
 * Функция-диспетчер __handleCardClickGeneral()__ события нажатия на карточку.
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
    openZoom(evTarget.src, evTarget.alt);
  }
};

//ЦИКЛ ОБРАБОТКИ НАЧАЛЬНЫХ КАРТОЧЕК МЕСТ

initialCard.forEach(function (card) {
  createCard(card.link, card.name);
});

//ЭКСПОРТ

export {popupPlace, handleCardClickGeneral, createCard};