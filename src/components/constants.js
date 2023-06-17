/**
 * КОНСТАНТЫ
 * */

const formProfile = document.forms["profile-form"];
const cardContainer = document.querySelector('.card-grid');
const popupPlace = document.querySelector('.popup_type_place');
const formPlace = document.forms["card-form"];
const formDelete = document.forms["delete-form"];
const formAvatar = document.forms["avatar-form"];
const popupAvatar = document.querySelector('.popup_type_avatar');
const avatar = document.querySelector('.profile__avatar');
const nameUser = document.querySelector('.profile__name');
const statusUser = document.querySelector('.profile__status');


const selectorsForPopup = {
  overlayClass: 'popup__shadow',
  openButtonClass: 'popup__button-close',
  openingPopupSelector: '.popup_opened',
  openingPopupClass: 'popup_opened',
};




export {
  formAvatar,
  formProfile,
  formDelete,
  cardContainer,
  nameUser,
  formPlace,
  popupAvatar,
  avatar,
  popupPlace,
  statusUser,
}