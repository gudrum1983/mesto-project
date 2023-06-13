/**
 * ИМПОРТЫ
 * */
import {cardContainer, popupPlace, showError, result} from "./utils";
import {openPopup} from "./modal";
import {sendStatusLike} from "./api";


/**
 * КОНСТАНТЫ
 * */
const cardTemplate = document.querySelector('#itemTemplate').content;
const popupZoom = document.querySelector('.popup_type_zoom');
const imgPopupZoom = popupZoom.querySelector('.zoom__photo');
const titlePopupZoom = popupZoom.querySelector('.zoom__caption');

/**
 * Функция __checkMyLike()__ проверяет есть ли в массиве лайков лайк юзера с ID
 * @param {array} likesArray - массив лайков
 * @param {string} ID - идентификатор пользователя
 */
function checkMyLike(likesArray, ID) {
  if (likesArray.length > 0) {
    const check = likesArray.map(function (item) {
      return item._id;
    })
    return check.includes(ID);
  } else {
    return false;
  }
}

/**
 * Функция __getCard()__ создает карточку по шаблону
 * @param {string} cardName - название карточки
 * @param {string} cardLink - ссылка на изображение
 * @param {string} cardId - идентификатор карточки
 * @param {array} cardLikes - массив карточек
 * @param {boolean} hasMyLike - признак наличия моего лайк
 * @param {boolean} myCard - признак является ли карточка моей
 */
function getCard(cardName, cardLink, cardId, cardLikes, hasMyLike, myCard) {
  const newCardElement = cardTemplate.cloneNode(true);
  //заполняем картинку карточки
  const cardImage = newCardElement.querySelector('.card__photo');
  cardImage.src = cardLink;
  cardImage.alt = `Визуальное отображение места - ${cardName}`;
  cardImage.addEventListener('click', () => openZoom(cardLink, cardName));
  //заполняем лайк
  const cardNumberLike = newCardElement.querySelector('.card__like-number');
  const cardLike = newCardElement.querySelector('.card__like');
  cardNumberLike.textContent = (cardLikes.length);
  cardLike.addEventListener('click', () => toggleLike(cardLike, cardNumberLike, cardId));
  if (hasMyLike) {
    cardLike.classList.add('card__like_active');
  }
  //определяем наша ли карточка и заполняем кнопку удаления
  const cardTrash = newCardElement.querySelector('.card__trash');
  if (myCard) {
    cardTrash.addEventListener('click', () => prepareDeleteCard(cardTrash, cardId));
  } else {
    cardTrash.remove();
  }
  newCardElement.querySelector('.card__title').textContent = cardName;
  return newCardElement;
}

/**
 * Функция __createCard()__ добавляет карточку в контейнер
 *  @param {object} card - карточка
 *  @param {string} userId - идентификатор юзера
 */
function createCard(card, userId) {
  const hasMyLike = checkMyLike(card.likes, userId);
  const myCard = (card.owner._id === userId);
  const cardElement = getCard(card.name, card.link, card._id, card.likes, hasMyLike, myCard);
  cardContainer.prepend(cardElement);
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
  openPopup(popupZoom);
};

function markCard(buttonTrash) {
  const findDelCards = document.querySelectorAll('.card-deleted');
  if (findDelCards.length >= 1) {
    findDelCards.forEach(item => {
      item.classList.remove('card-deleted');
    })
  }
  const cardElement = buttonTrash.closest('.card');
  cardElement.classList.add('card-deleted');
}

/**
 * Функция __openDeleteCard()__ открывает модальное окно подтверждения удаления
 * и помечает карточку на удаление
 *  @param {Element} buttonTrash - дом элемент кнопка удаления карточки
 *  @param {string} cardId - идентификатор карточки
 */
function prepareDeleteCard(buttonTrash, cardId) {
  markCard(buttonTrash);
  const popupDelete = document.querySelector('.popup_type_delete');
  const buttonSubmit = popupDelete.querySelector('.form__button-submit');
  buttonSubmit.value = cardId;
  openPopup(popupDelete);
};

/**
 * Функция __removeCard()__ удаляет помеченную на удаление карточку
 */
function removeCard() {
  const cardElement = document.querySelector('.card-deleted');
  cardElement.remove();
}

/**
 * Функция __updateStatusLike()__ обновляет данные о лайке на сервере
 * @param {Element} likeElement - элемент лайк
 * @param {Element} numberLikeElement - элемент лайка цифра
 * @param {string} cardID - идентификатор карточки
 * @param {boolean} activeLike - признак активности лайка
 */
function updateStatusLike(cardID, likeElement, numberLikeElement, activeLike) {
  sendStatusLike(cardID, activeLike)
    .then(result)
    .then(data => {
      numberLikeElement.textContent = (data.likes.length);
      if (activeLike) {
        likeElement.classList.remove('card__like_active');
      } else {
        likeElement.classList.add('card__like_active');
      }
    })
    .catch((err) => {
      showError(err);
    })
}


/**
 * Функция __toggleLike()__ переключает класс активности у элемента переданного параметром
 * @param {Element} like - элемент лайк
 * @param {Element} cardNumberLike - элемент лайка цифра
 * @param {string} cardID - идентификатор карточки
 */
function toggleLike(like, cardNumberLike, cardID) {
  const isHasActiveLike = like.classList.contains('card__like_active')
  updateStatusLike(cardID, like, cardNumberLike, isHasActiveLike);
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
export {popupPlace, createCard, buildCards, checkMyLike, removeCard};