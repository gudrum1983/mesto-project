//*************************************************************************************************
//КОНСТАНТЫ
//*************************************************************************************************
//const formProfile = document.forms["profile-form"];
import {formProfile} from './new.js';
import '/pages/index.css'; // добавьте импорт главного файла стилей

const nameInputFormProfile = formProfile.querySelector('[name="user-name"]');
const statusInputFormProfile = formProfile.querySelector('[name="user-status"]');
const popupProfile = document.querySelector('.popup_type_profile');

const formPlace = document.forms["card-form"];
const titleInputFormPlace = formPlace.querySelector('[name="title"]');
const linkInputFormPlace = formPlace.querySelector('[name="link-img"]');
const popupPlace = document.querySelector('.popup_type_place');

const profileUser = document.querySelector('.profile');
const nameUser = profileUser.querySelector('.profile__name');
const statusUser = profileUser.querySelector('.profile__status');

const popupZoom = document.querySelector('.popup_type_zoom');
const imgPopupZoom = popupZoom.querySelector('.zoom__photo');
const titlePopupZoom = popupZoom.querySelector('.zoom__caption');

const closeButtons = document.querySelectorAll('.popup__button-close');
const openPopupProfileButton = document.querySelector('.profile__button-edit');
const openPopupPlaceButton = document.querySelector('.profile__button-add');

const cardContainer = document.querySelector('.card-grid');

const cardTemplate = document.querySelector('#itemTemplate').content;

//////////////////////
const window = document.querySelector('.page');

const submitButton = document.querySelector('.form__button-submit');

submitButton.setAttribute('disabled', 'бла-бла');
////////////////
import khabImage from '/images/хабаровск.jpg';
import svobImage from '/images/свободный.jpg';
import vladImage from '/images/владивосток.png';
import blagImage from '/images/благовещенск.jpg';
import mosImage from '/images/москва.png';
import kazImage from '/images/казань.jpg';


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
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА + СЛУШАТЕЛЬ на ескейп
//*************************************************************************************************
function keyHandler(evt) {
  const popupOpened = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }
}

function clickHandler(evt) {
  const popupOpened = document.querySelector('.popup_opened')
  closePopup(popupOpened);
  /*if (evt.target.classList.contains('popup__shadow')) {
    closePopup(popupOpened);
  }*/
}


/////


// Вынесем все необходимые элементы формы в константы
/*const formElement = document.querySelector('.form');
const formInput = formElement.querySelectorAll('.form__input');*/

// Функция, которая добавляет класс с ошибкой
/*const showInputError = (element, errorMessage) => {
  element.classList.add('form__input_type_error');
  const formError = document.querySelector(`.${element.id}-error`);
  formError.classList.add('form__input-error_active');
  formError.textContent = errorMessage;

};*/

// Функция, которая удаляет класс с ошибкой
/*const hideInputError = (element) => {
  element.classList.remove('form__input_type_error');
  const formError = document.querySelector(`.${element.id}-error`);
  formError.classList.remove('form__input-error_active');
  formError.textContent = '';
};*/

// Функция, которая проверяет валидность поля
/*function isValid(elementInput) {
  if (!elementInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(elementInput, elementInput.validationMessage);
    const formError = document.querySelector(`.${elementInput.id}-error`);
    formError.classList.add('form__input_type_error');

  } else {
    // Если проходит, скроем
    hideInputError(elementInput);
  }
};*/


const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
    // HTML мы писали в kebab-case, это не опечатка)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
};
// Вызовем функцию isValid на каждый ввод символа
/*formInput.forEach(elementInput => {
  elementInput.addEventListener('input', isValid);
})*/

/*formInput.forEach(function (elementInput) {

  elementInput.addEventListener('input',() => isValid(elementInput));
});*/


const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__button-submit');
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    /*buttonElement.disabled = true;*/
    buttonElement.setAttribute('disabled', 'бла-бла');
    buttonElement.classList.add('form__submit_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove('form__submit_inactive');
  }
};


/*[а-яёa-w\-\ ]gi*/
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА ФОРМЫ + СЛУШАТЕЛЬ
//*************************************************************************************************

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', keyHandler);
  const overlay = popup.querySelector('.popup__shadow')
  overlay.addEventListener('click', clickHandler);
};

function openProfilePopup() {
  nameInputFormProfile.value = nameUser.textContent;
  statusInputFormProfile.value = statusUser.textContent;
  const rer = popupProfile.querySelector('.form');
  const inputList = Array.from(rer.querySelectorAll('.form__input'));
  const buttonElement = rer.querySelector('.form__button-submit');

  isValid(rer, nameInputFormProfile);
  isValid(rer, statusInputFormProfile);
  toggleButtonState(inputList, buttonElement);
  openPopup(popupProfile);
};

openPopupProfileButton.addEventListener('click', openProfilePopup);
openPopupPlaceButton.addEventListener('click', () => openPopup(popupPlace));

///////////////////////////////////////////////////////////////////////////////////////////////////

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
//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА + СЛУШАТЕЛЬ
//*************************************************************************************************
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keyup', keyHandler);
};

closeButtons.forEach(function (button) {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
///////////////////////////////////////////////////////////////////////////////////////////////////


//*************************************************************************************************
//ФУНКЦИЯ УДАЛЕНИЯ КАРТОЧКИ МЕСТА
//*************************************************************************************************
function deleteCard(evt) {
  const buttonDelete = evt.target;
  const card = buttonDelete.closest('.card');
  card.remove();
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

///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ИЗМЕНЕНИЯ ПОВЕДЕНИЯ SUBMIT ФОРМЫ В ПОПАПЕ PROFILE + СЛУШАТЕЛЬ
//*************************************************************************************************
function handleFormSubmitProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  nameUser.textContent = nameInputFormProfile.value; //
  statusUser.textContent = statusInputFormProfile.value;
  closePopup(popupProfile)
};

formProfile.addEventListener('submit', handleFormSubmitProfile);
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ИЗМЕНЕНИЯ ПОВЕДЕНИЯ SUBMIT ФОРМЫ В ПОПАПЕ PLACE + СЛУШАТЕЛЬ
//*************************************************************************************************
function handleFormSubmitPlace(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  createCard(linkInputFormPlace.value, titleInputFormPlace.value);
  evt.target.reset()
  closePopup(popupPlace);
};

formPlace.addEventListener('submit', handleFormSubmitPlace);
///////////////////////////////////////////////////////////////////////////////////////////////////