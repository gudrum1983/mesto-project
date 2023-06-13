/**
 * КОНСТАНТЫ
 * */
const selectorsForValid = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_active'
};
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

/**
 * Функция __fillProfile()__ добавляет карточку в контейнер
 *  @param {string} name - имя юзера
 *  @param {string} about - значение информации о юзере
 */
function fillProfile(name, about) {
  nameUser.textContent = name;
  statusUser.textContent = about;
}

/**
 * Функция __fillAvatar()__ запускает заполнение профиля
 *  @param {string} linkAvatar - ссылка на аватар
 */
function fillAvatar(linkAvatar) {
  avatar.src = linkAvatar;
}

/**
 * Функция __fillEntireProfile()__ запускает заполнение профиля
 *  @param {object} objectProfile - объект профиль юзера
 */
function fillEntireProfile(objectProfile) {
  fillProfile(objectProfile.name, objectProfile.about);
  fillAvatar(objectProfile.avatar);
}

/**
 * Константа-шаблон __result()__ функции получения, проверки и преобразования ответа
 * @param {Object} response - ответ от запроса fetch
 */
const result = (response) => {
  /*if (response.ok) {
    return response.json()
  } else {
    return promise.reject('Ошибка подключения к серверу')
  }*/
  return response.ok ? response.json() : promise.reject('Ошибка подключения к серверу');
}

const textError = 'Упс...что-то пошло не так! Попейте вкусного чая, а потом попробуйте снова!\nС любовью, Екатерина и команда Яндекс практикум!'
const showError = (err) => {
  alert(textError);
  console.log(`Запрос не выполнен. ${err}.`);
};


/**
 * ЭКСПОРТ
 * */
export {
  selectorsForValid,
  cardContainer,
  formProfile,
  popupPlace,
  formPlace,
  formDelete,
  formAvatar,
  popupAvatar,
  nameUser,
  statusUser,
  fillProfile,
  fillAvatar,
  fillEntireProfile,
  showError,
  result
};



