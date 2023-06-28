/**
 * ИМПОРТЫ
 * */
import {cardContainer, popupPlace} from "./constants"
import CardOOP from "./CardOOP";
import Section from "./Section";
/**
 * КОНСТАНТЫ
 * */
// popupZoom = document.querySelector('.popup_type_zoom');
const popupDelete = document.querySelector('.popup_type_delete');
const buttonSubmitDelete = popupDelete.querySelector('.form__button-submit');

/**
 * Функция __createCard()__ добавляет карточку в контейнер
 *  @param {object} card - карточка
 *  @param {string} userId - идентификатор юзера
 *  @param {boolean} isReverse - идентификатор обратного порядка постоения карточек
 */
function createCard(card, userId, isReverse) {
  const myCard = (card.owner._id === userId);
  const cardElementNew = new CardOOP({cardName:card.name,
    cardLink:card.link,
    cardID:card._id,
    userID:userId,
    cardLikes:card.likes,
    myCard:myCard}, '.cardTemplate');
  const cardElement = cardElementNew.generateOOP();
  isReverse ? cardContainer.append(cardElement) : cardContainer.prepend(cardElement);
};

/**
 * Функция __removeCard()__ удаляет помеченную на удаление карточку
 */
function removeCard() {
  const cardElement = document.querySelector('.card[data-deleted = "true"]');
  cardElement.remove();
}

function buildCards(cards, userId) {
  const CardList = new Section(
    { items: cards, renderer: (card) => {
      const newCard = new CardOOP({card:card, userID:userId},'.card-template');
      const cardElement = newCard.generateOOP();
      CardList.addItem(cardElement);
    }
  }, '.card-grid');
  CardList.renderItems();
}

/**
 * ЭКСПОРТ
 * */
export {popupPlace, createCard, buildCards, removeCard, popupDelete, buttonSubmitDelete};