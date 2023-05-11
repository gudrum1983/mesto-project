//*************************************************************************************************
//КОНСТАНТЫ
//*************************************************************************************************
const formProfile = document.getElementById('form-profile');
const nameInputFormProfile = formProfile.querySelector('[name="user-name"]');
const statusInputFormProfile = formProfile.querySelector('[name="user-status"]');

const formPlace = document.getElementById('form-place');
const titleInputFormPlace = formPlace.querySelector('[name="title"]');
const linkInputFormPlace = formPlace.querySelector('[name="link-img"]');

const profileUser = document.querySelector('.profile');
const nameUser = profileUser.querySelector('.profile__name');
const statusUser = profileUser.querySelector('.profile__status');

const popupZoom = document.querySelector('.popup_type_zoom');
const imgPopupZoom = popupZoom.querySelector('.popup__photo');
const titlePopupZoom = popupZoom.querySelector('.popup__caption');

const buttonsClose = document.querySelectorAll('.popup__button-close');

const buttonsOpenForm = document.querySelectorAll('.button_open');

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
function openedPopupForm(evt) {
  const button = evt.target;
  const buttonIdForm = button.form;
  const popupForm = buttonIdForm.closest('.popup');
  if (buttonIdForm === formProfile) {
    nameInputFormProfile.value = nameUser.textContent;
    statusInputFormProfile.value = statusUser.textContent;
  }
  popupForm.classList.add('popup_opened');
};

buttonsOpenForm.forEach(function (item) {
  item.addEventListener('click', openedPopupForm);
});
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА УВЕЛИЧЕНИЯ ИЗОБРАЖЕНИЯ КАРТОЧКИ МЕСТА
//*************************************************************************************************
function openPopupZoom(evt) {
  const imgTarget = evt.currentTarget;
  const imgLink = imgTarget.getAttribute("src");
  const imgAlt = imgTarget.getAttribute("alt");
  const card = imgTarget.parentNode;
  const title = card.querySelector('.card__title');
  const titleText = title.textContent;
  imgPopupZoom.setAttribute('alt', imgAlt)
  imgPopupZoom.setAttribute('src', imgLink)
  titlePopupZoom.textContent = titleText
  popupZoom.classList.add('popup_opened');
};

///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПА + СЛУШАТЕЛЬ
//*************************************************************************************************
function closedPopup(evt) {
  const evtTarget = evt.target;
  const popupParent = evtTarget.closest('.popup');
  popupParent.classList.remove('popup_opened');
};

buttonsClose.forEach(function (item) {
  item.addEventListener('click', closedPopup);
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
function createCard(srcValue, titleValue) {
  const cardTemplate = document.querySelector('#itemTemplate').content;
  const cardContainer = document.querySelector('.card-grid');
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__photo').src = srcValue;
  cardElement.querySelector('.card__photo').alt = `Визуальное отображение места - ${titleValue}`;
  cardElement.querySelector('.card__title').textContent = titleValue;

  cardElement.querySelector('.card__like').addEventListener('click', toggleLike)
  cardElement.querySelector('.card__photo').addEventListener('click', openPopupZoom);
  cardElement.querySelector('.card__trash').addEventListener('click', deleteCard);
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
  closedPopup(evt)
};

formProfile.addEventListener('submit', handleFormSubmitProfile);
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ИЗМЕНЕНИЯ ПОВЕДЕНИЯ SUBMIT ФОРМЫ В ПОПАПЕ PLACE + СЛУШАТЕЛЬ
//*************************************************************************************************
function handleFormSubmitPlace(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  createCard(linkInputFormPlace.value, titleInputFormPlace.value);
  linkInputFormPlace.value = '';
  titleInputFormPlace.value = '';
  formPlace.classList.remove('.popup_opened')
  closedPopup(evt);
};

formPlace.addEventListener('submit', handleFormSubmitPlace);
///////////////////////////////////////////////////////////////////////////////////////////////////