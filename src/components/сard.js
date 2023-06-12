/**
 * ИМПОРТЫ
 * */
import {cardContainer, popupPlace} from "./utils";
import {openPopup} from "./modal";
import {sendStatusLike} from "./api";


/**
 * КОНСТАНТЫ
 * */
const cardTemplate = document.querySelector('#itemTemplate').content;
const popupZoom = document.querySelector('.popup_type_zoom');
const imgPopupZoom = popupZoom.querySelector('.zoom__photo');
const titlePopupZoom = popupZoom.querySelector('.zoom__caption');

function handleCardTrash(cardElement, cardTrash, cardUserID, userID, cardId) {

}

function checkMyLike(likesArray, ID) {
  if (likesArray.length > 0) {
    const check = likesArray.map(function (item) {
      return item._id
    })
    return check.includes(ID)
  } else {
    return false;
  }
}

/**
 * Функция __getCard()__ создает карточку по шаблону
 *  @param {string} srcValue - ссылка на изображение
 *  @param {string} titleValue - наименование места
 *  @param {string} likeValue - количество лайков
 */
function getCard(cardName, cardLink, cardId, cardLikes, hasMyLike, myCard) {
  const newCardElement = cardTemplate.cloneNode(true);
  //добавляем реквизит id в карточке для лайка
  //const cardBlock = newCardElement.querySelector('.card');
  //cardBlock.dataset.cardId = cardId;
  //заполняем картинку
  const cardImage = newCardElement.querySelector('.card__photo');
  cardImage.src = cardLink;
  cardImage.alt = `Визуальное отображение места - ${cardName}`;
  cardImage.addEventListener('click', () => openZoom(cardLink, cardName));
  //заполняем количество лайков
  const cardNumberLike = newCardElement.querySelector('.card__like-number');
  cardNumberLike.textContent = (cardLikes.length);
  //определяем есть ли наш лайк и заполняем лайк
  const cardLike = newCardElement.querySelector('.card__like');
  cardLike.addEventListener('click', () => toggleLike(cardLike, cardNumberLike, cardId));
  if (hasMyLike) {
    cardLike.classList.add('card__like_active')
  }
  //определяем наша ли карточка и заполняем кнопку удаления
  const cardTrash = newCardElement.querySelector('.card__trash');

  if (myCard) {
    cardTrash.classList.remove('button_type_hidden')
    cardTrash.addEventListener('click', () => openDeleteCard(cardTrash, cardId));
  }
  cardTrash.dataset.id = cardId;
  /*setAtribute(cardTrash, cardId)
  function setAtribute(cardElement, cardId) {
    cardElement.dataset.id = cardId;
  }*/

  newCardElement.querySelector('.card__title').textContent = cardName;
  return newCardElement
}

/**
 * Функция __createCard()__ добавляет карточку в контейнер
 *  @param {string} srcValue - ссылка на изображение
 *  @param {string} titleValue - наименование места
 */
function createCard(card, userId) {
  const hasMyLike = checkMyLike(card.likes, userId);
  const myCard = (card.owner._id === userId);
  const cardElement = getCard(card.name, card.link, card._id, card.likes, hasMyLike, myCard);
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
  imgPopupZoom.setAttribute('alt', `Визуальное отображение места - ${titleValue}`);
  imgPopupZoom.setAttribute('src', srcValue);
  titlePopupZoom.textContent = titleValue;
  openPopup(popupZoom)
};

/**
 * Функция __deleteCard()__ удаляет элемент (родитель с классом card)
 * для элемента переданного параметром
 *  @param {Element} buttonTrash - дом элемент кнопка удаления карточки
 */
function openDeleteCard(buttonTrash, cardId) {
  //проверяем нет ли случайно отмеченных на удаление карточек
  const findDelCarts = document.querySelectorAll('.deleteCard');
  if (findDelCarts.length >= 1) {
    findDelCarts.forEach(item => {
      item.classList.remove('card-deleted')
    })
  }
  const cardElement = buttonTrash.closest('.card')
  cardElement.classList.add('card-deleted')
  const popupDelete = document.querySelector('.popup_type_delete');
  const buttonSubmit = popupDelete.querySelector('.form__button-submit');
  buttonSubmit.value = cardId;
  openPopup(popupDelete);
};


function deleteCard() {
  const cardElement = document.querySelector('.card-deleted');
  cardElement.remove()
}


/**
 * Функция __toggleLike()__ переключает класс активности у элемента переданного параметром
 * @param {Element} like - элемент лайк
 * @param {Element} cardNumberLike - элемент лайка цифра
 * @param {string} cardID - идентификатор карточки
 */
function toggleLike(like, cardNumberLike, cardID) {
   if (!(like.classList.contains('card__like_active'))) {
    sendStatusLike(cardID, like, cardNumberLike, 'PUT');
  } else {
    sendStatusLike(cardID, like, cardNumberLike, 'DELETE');
  }
};




/**
 * Функция __buildingCards()__ обрабатывает полученный массив и запускает создание карточек
 * @param {array} cards - массив карточек
 * @param {string} userID - идентификатор пользователя
 */
function buildCards(cards, userID) {
  cards.forEach(function (card) {
       createCard(card, userID);
  });
}


/**
 * ЭКСПОРТ
 * */
export {popupPlace, createCard, buildCards, checkMyLike, deleteCard};