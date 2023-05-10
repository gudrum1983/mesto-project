//CONSTANTS




//FUNCTION ADDED CARDS FROM TEMPLATE
function createCard(srcValue, titleValue) {
    const cardTemplate = document.querySelector('#itemTemplate').content;
    const cardContainer = document.querySelector('.card-grid');
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__photo').src = srcValue;
    cardElement.querySelector('.card__photo').alt = `Визуальное отображение места - ${titleValue}`;
    cardElement.querySelector('.card__title').textContent = titleValue;

    cardElement.querySelector('.icon-heart').addEventListener('click', toggleLike)
    cardElement.querySelector('.card__photo').addEventListener('click', openPopupZoomImg);
    cardElement.querySelector('.trash').addEventListener('click', deleteCard);
    cardContainer.prepend(cardElement)
}

//FUNCTION OPEN POPUP ZOOM IMAGE
function deleteCard(ev) {
    const itemButton = ev.target;
    const card = itemButton.closest('.card');
    card.remove();
}


//FUNCTION OPEN POPUP ZOOM IMAGE


//


//CLOSED POPUP


/******************/
/****LISTENERS*****/
/******************/


//SUBMIT ADD LISTENER



//*************************************************************************************************
//КОНСТАНТА И СЛУШАТЕЛЬ НА КНОПКИ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА ДЛЯ ФОРМ
//*************************************************************************************************
const BUTTONS_CLOSED_POPUP = document.querySelectorAll('.popup__button-close');
BUTTONS_CLOSED_POPUP.forEach(function (item) {
    item.addEventListener('click', closedPopup);
});
//*************************************************************************************************


//*************************************************************************************************
//КОНСТАНТА И СЛУШАТЕЛЬ НА КНОПКИ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА ДЛЯ ФОРМ
//*************************************************************************************************
const BUTTONS_OPENED_FORM = document.querySelectorAll('.button_open');
BUTTONS_OPENED_FORM.forEach(function (item) {
    item.addEventListener('click', openedPopupForm);
});
//*************************************************************************************************


//*************************************************************************************************
//КОНСТАНТА И СЛУШАТЕЛЬ НА КНОПКУ SUBMIT ФОРМЫ PLACE
//*************************************************************************************************
const FORM_PLACE = document.querySelector('.form_place')
FORM_PLACE.addEventListener('submit', handleFormSubmitPlace);
//*************************************************************************************************