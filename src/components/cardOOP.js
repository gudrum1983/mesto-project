import {openPopup} from "./modal";
import {openDelete} from "./index";
import {buttonSubmitDelete} from "./сard";
import {api} from "./apiOOP";
import {showError} from "./utils";

const popupZoom = document.querySelector('.popup_type_zoom');
const imgPopupZoom = popupZoom.querySelector('.zoom__photo');
const titlePopupZoom = popupZoom.querySelector('.zoom__caption');

export default class Card {
  constructor({cardLink, cardName, cardID, cardLikes, hasMyLike, myCard}, selector) {
    this._cardLink = cardLink;
    this._cardName = cardName;
    this._cardID = cardID;
    this._cardLikes = cardLikes;
    this._hasMyLike = hasMyLike;
    this._myCard =  myCard;
    this._selector = selector;
  }


  _openZoom(srcValue, titleValue) {
    imgPopupZoom.setAttribute('alt', `Визуальное отображение места - ${titleValue}`);
    imgPopupZoom.setAttribute('src', srcValue);
    titlePopupZoom.textContent = titleValue;
    openPopup(popupZoom);
  };

  _updateStatusLike(cardID, likeElement, numberLikeElement, activeLike) {
    api.sendStatusLikeOOP(cardID, activeLike)
      .then(data => {
        numberLikeElement.textContent = (data.likes.length);
        if (activeLike) {
          likeElement.classList.remove('card__like_active');
        } else {
          likeElement.classList.add('card__like_active');
        }
      })
      .catch(showError);
  }

  _toggleLikeOOP(like, cardNumberLike, cardID) {
    const isHasActiveLike = like.classList.contains('card__like_active')
    this._updateStatusLike(cardID, like, cardNumberLike, isHasActiveLike);
  };

  _markCardOOP(buttonTrash) {
    const findDelCards = document.querySelectorAll('.card[data-deleted = "true"]');
    if (findDelCards.length > 0) {
      findDelCards.forEach(item => {
        delete item.dataset.deleted
      })
    }
    const cardElement = buttonTrash.closest('.card');
    cardElement.dataset.deleted = true;
  }

  _prepareDeleteCardOOP(buttonTrash, cardId) {
    this._markCardOOP(buttonTrash);
    buttonSubmitDelete.value = cardId;
    buttonSubmitDelete.disabled = false;
    openDelete();
  };

  _getElementOOP() {
    const newCardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    const cardImage = newCardElement.querySelector('.card__photo');
    cardImage.src = this._cardLink;
    cardImage.alt = `Визуальное отображение места - ${this._cardName}`;
    cardImage.addEventListener('click', () => this._openZoom(this._cardLink, this._cardName));
    //заполняем лайк
    const cardNumberLike = newCardElement.querySelector('.card__like-number');
    const cardLike = newCardElement.querySelector('.card__like');
    cardNumberLike.textContent = (this._cardLikes.length);
    cardLike.addEventListener('click', () => this._toggleLikeOOP(cardLike, cardNumberLike, this._cardID));
    if (this._hasMyLike) {
      cardLike.classList.add('card__like_active');
    }
    //определяем наша ли карточка и заполняем кнопку удаления
    const cardTrash = newCardElement.querySelector('.card__trash');
    if (this._myCard) {
      cardTrash.addEventListener('click', () => this._prepareDeleteCardOOP(cardTrash, this._cardID));
    } else {
      cardTrash.remove();
    }
    newCardElement.querySelector('.card__title').textContent = this._cardName;
    return newCardElement;
  }

/*  _handleOpenPopup() {
    popupImage.src = this._image;
    popupElement.classList.add('popup_is-opened');
  }

  _handleClosePopup() {
    popupImage.src = '';
    popupElement.classList.remove('popup_is-opened');
  }

  _setEventListeners() {
    this._element.addEventListener('click', () => {
      this._handleOpenPopup();
    });

    popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });
  }*/
}