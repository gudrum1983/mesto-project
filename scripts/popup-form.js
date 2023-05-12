//*************************************************************************************************
//КОНСТАНТЫ
//*************************************************************************************************
const formProfile = document.forms["profile-form"];
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


const initialCard = [
  {
    name: 'Хабаровск',
    link: './images/хабаровск.jpg'
  },
  {
    name: 'Свободный',
    link: './images/свободный.jpg'
  },
  {
    name: 'Владивосток',
    link: './images/владивосток.png'
  },
  {
    name: 'Благовещенск',
    link: './images/благовещенск.jpg'
  },
  {
    name: 'Москва',
    link: './images/москва.png'
  },
  {
    name: 'Казань',
    link: './images/казань.jpg'
  }
];
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА ФОРМЫ + СЛУШАТЕЛЬ
//*************************************************************************************************

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function openProfilePopup() {
  nameInputFormProfile.value = nameUser.textContent;
  statusInputFormProfile.value = statusUser.textContent;
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
};

closeButtons.forEach(function (button) {
  const popup = button.closest('.popup');
  button.addEventListener('click',() => closePopup(popup));
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