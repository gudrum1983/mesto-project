//CONSTANTS
const BUTTONS_OPENED_FORM = document.querySelectorAll('.button_open');
const PROFILE_NAME = document.querySelector('.profile__name');
const PROFILE_STATUS = document.querySelector('.profile__status');
const FORM_PROFILE = document.querySelector('.form_profile')
const INPUT_NAME_FORM_PROFILE = FORM_PROFILE.querySelector('.edit-profile__field_input_name')
const INPUT_STATUS_FORM_PROFILE = FORM_PROFILE.querySelector('.edit-profile__field_input_status')
const POPUP_IMG = document.querySelector('.popup-image')
const POPUP_FIGURE = document.querySelector('.popup__figure');
const FORM_PLACE = document.querySelector('.form_place')
const BUTTONS_CLOSED_POPUP = document.querySelectorAll('.popup__button-close');




//FUNCTION ADDED CARDS FROM TEMPLATE
function createCard(srcValue, titleValue) {
	const cardTemplate = document.querySelector('#itemTemplate').content;
	const cardContainer = document.querySelector('.card-grid');
	const cardElement = cardTemplate.cloneNode(true);

	cardElement.querySelector('.card__photo').src = srcValue;
	cardElement.querySelector('.card__photo').alt = `Визуальное отображение места - ${titleValue}`;
	cardElement.querySelector('.card__title').textContent = titleValue;

	cardElement.querySelector('.icon-heart').addEventListener('click', toggleLike)
	cardElement.querySelector('.card__photo').addEventListener('click', openPopupImg);
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


FORM_PROFILE.addEventListener('submit', handleFormSubmitProfile);

BUTTONS_CLOSED_POPUP.forEach(function (item) {
	item.addEventListener('click', closedPopup);
});

BUTTONS_OPENED_FORM.forEach(function (item) {
	item.addEventListener('click', openedPopupForm);
});

//ADD LISTENER FOR SUBMIT POPUP PLACE
FORM_PLACE.addEventListener('submit', handleFormSubmitPlace);