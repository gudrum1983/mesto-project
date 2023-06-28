import {openPopup} from "./modal";
import {openDelete} from "./index";
import {buttonSubmitDelete} from "./сard";
import {api} from "./apiOOP";
import {showError} from "./utils";

const popupZoom = document.querySelector('.popup_type_zoom');
const imgPopupZoom = popupZoom.querySelector('.zoom__photo');
const titlePopupZoom = popupZoom.querySelector('.zoom__caption');

export default class CardOOP {
  constructor({card, userID}, selector) {
    this._userID = userID;
    this._cardLink = card.link;
    this._cardName = card.name;
    this._cardID = card._id;
    this._cardLikes = card.likes;
    this._myCard = (card.owner._id === this._userID);
    this._hasMyLike = this._checkMyLike(this._cardLikes, this._userID)
    this._selector = selector;
  }

  _checkMyLike(likesArray, ID) {
    if (likesArray.length > 0) {
      const check = likesArray.map(function (item) {
        return item._id;
      })
      return check.includes(ID);
    } else {
      return false;
    }
  }

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

  _getElementOOP() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);
      }

  generateOOP() {
    this._element =  this._getElementOOP();
    this._cardImage = this._element.querySelector('.card__photo');
    this._cardNumberLike = this._element.querySelector('.card__like-number');
    this._cardLike = this._element.querySelector('.card__like');
    this._cardTrash = this._element.querySelector('.card__trash');
    this._setEventListeners();
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = `Визуальное отображение места - ${this._cardName}`;
    this._cardNumberLike.textContent = (this._cardLikes.length);
    if (this._hasMyLike) {
      this._cardLike.classList.add('card__like_active');
    }
     if (!this._myCard) {
      this._cardTrash.remove();
    }
    this._element.querySelector('.card__title').textContent = this._cardName;
    return this._element;
  }

  _openZoom(srcValue, titleValue) {
    imgPopupZoom.setAttribute('alt', `Визуальное отображение места - ${titleValue}`);
    imgPopupZoom.setAttribute('src', srcValue);
    titlePopupZoom.textContent = titleValue;
    openPopup(popupZoom);
  };

  _toggleLikeOOP(like, cardNumberLike, cardID) {
    const isHasActiveLike = like.classList.contains('card__like_active')
    this._updateStatusLike(cardID, like, cardNumberLike, isHasActiveLike);
  };

  _prepareDeleteCardOOP(buttonTrash, cardId) {
    this._markCardOOP(buttonTrash);
    buttonSubmitDelete.value = cardId;
    buttonSubmitDelete.disabled = false;
    openDelete();
  };

  _setEventListeners() {
    this._cardImage.addEventListener('click', () =>
      this._openZoom(this._cardLink, this._cardName));

    this._cardLike.addEventListener('click', () =>
      this._toggleLikeOOP(this._cardLike, this._cardNumberLike, this._cardID));

    if (this._myCard) {
      this._cardTrash.addEventListener('click', () =>
        this._prepareDeleteCardOOP(this._cardTrash, this._cardID));
    }
  }
}