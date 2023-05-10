
const formProfile = document.querySelector('.form_profile');
const nameInputFormProfile = formProfile.querySelector('.popup__field_input_name')
const statusInputFormProfile = formProfile.querySelector('.popup__field_input_status')

const formPlace = document.querySelector('.form_place');
const titleInputFormPlace = formPlace.querySelector('.popup__field_input_title');
const linkInputFormPlace = formPlace.querySelector('.popup__field_input_link-img');

const profile = document.querySelector('.profile')
const profileName = profile.querySelector('.profile__name');
const profileStatus = profile.querySelector('.profile__status');


function openedPopupForm(ev) {
	const button= ev.target;
	const buttonIdForm = button.form; //нахожу форму
	const popupForm = buttonIdForm.closest('.popup') // нахожу попап
	if (buttonIdForm === formProfile) {
		nameInputFormProfile.value = profileName.textContent;
		statusInputFormProfile.value = profileStatus.textContent;
	}
	popupForm.classList.add('popup_opened')
};


function closedPopup(ev) {
	const evTarget = ev.target;

	if (evTarget.classList.contains('popup__button-closeImg')) {
		const ChildrenPopupOne = popupFigure.querySelector('.photo');
		const ChildrenPopupTwo = popupFigure.querySelector('.popup__caption');
		popupFigure.removeChild(ChildrenPopupOne);
		popupFigure.removeChild(ChildrenPopupTwo);
		popupZoomImg.classList.remove('popup_opened');
	}
	const popupParent = evTarget.closest('.popup')
	popupParent.classList.remove('popup_opened');
};
//

formProfile.addEventListener('submit', handleFormSubmitProfile);

function handleFormSubmitProfile(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	//const nameInputFormProfile = formProfile.querySelector('.popup__field_input_name')
	//const statusInputFormProfile = formProfile.querySelector('.popup__field_input_status')


	profileName.textContent = nameInputFormProfile.value;
	profileStatus.textContent = statusInputFormProfile.value;
	//const eventTarget = evt.target;
	closedPopup(evt)
}


//FUNCTION SUBMIT PLACE POPUP
function handleFormSubmitPlace(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	const itemTarget = evt.target; //получаю кнопку сабмит
	createCard(linkInputFormPlace.value, titleInputFormPlace.value);
	linkInputFormPlace.value = '';
	titleInputFormPlace.value = '';
	formPlace.classList.remove('.popup_opened')
	closedPopup(evt);
}