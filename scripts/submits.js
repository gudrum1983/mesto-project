//SUBMIT PROFILE
function handleFormSubmitProfile(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	//const ded = nameInput.value;
	//const rer = jobInput.value;
	PROFILE_NAME.textContent = INPUT_NAME_FORM_PROFILE.value;
	PROFILE_STATUS.textContent = INPUT_STATUS_FORM_PROFILE.value;
	//const eventTarget = evt.target;
	closedPopup(evt)
}


//FUNCTION SUBMIT PLACE POPUP
function handleFormSubmitPlace(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	const itemTerget = evt.target;
	const parentsItem = itemTerget.closest('.popup');
	const titleForm = parentsItem.querySelector('.edit-profile__field_input_status');
	const imgSrcForm = parentsItem.querySelector('.edit-profile__field_input_name');
	createCard(titleForm.value, imgSrcForm.value);
	imgSrcForm.value = '';
	titleForm.value = '';
	parentsItem.classList.remove('.popup_opened')
	closedPopup(evt);
}