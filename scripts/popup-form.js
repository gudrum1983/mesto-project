//FUNCTION OPEN POPUP
function openedPopupForm(ev) {

	const evTarget = ev.target;
	const idForm = evTarget.form;
	const popupForm = idForm.closest('.popup')

	if (popupForm.classList.contains('popup_profile')) {
		document.querySelector('.edit-profile__field_input_name').value = PROFILE_NAME.textContent;
		document.querySelector('.edit-profile__field_input_status').value = PROFILE_STATUS.textContent;
	}
	popupForm.classList.add('popup_opened')
};


function closedPopup(ev) {
	const evTarget = ev.target;

	if (evTarget.classList.contains('popup__button-closeImg')) {
		const ChildrenPopupOne = POPUP_FIGURE.querySelector('.photo');
		const ChildrenPopupTwo = POPUP_FIGURE.querySelector('.popup__caption');
		POPUP_FIGURE.removeChild(ChildrenPopupOne);
		POPUP_FIGURE.removeChild(ChildrenPopupTwo);
		POPUP_IMG.classList.remove('popup_opened');
	}
	const popupParent = evTarget.closest('.popup')
	popupParent.classList.remove('popup_opened');
};
//