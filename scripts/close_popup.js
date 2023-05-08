const PROFILE_NAME = document.querySelector('.profile__name');
const PROFILE_STATUS = document.querySelector('.profile__status');

const buttonsOpening = document.querySelectorAll('.button_open');

function openedPopup(ev) {
    //debugger;
    const evTarget = ev.currentTarget;
    const idForm = evTarget.form;
    const a = idForm.closest('.popup')

    if (a.classList.contains('popup_profile')) {
        const nameInput = document.querySelector('.edit-profile__field_input_name');
        nameInput.value = PROFILE_NAME.textContent;
        const jobInput = document.querySelector('.edit-profile__field_input_status');
        jobInput.value = PROFILE_STATUS.textContent;
    }
    a.classList.add('popup_opened')
};

buttonsOpening.forEach(function (item) {
    item.addEventListener('click',  openedPopup);
});

const buttonsClose = document.querySelectorAll('.popup__button-close');

buttonsClose.forEach(function (item) {
    item.addEventListener('click', closedPopup);
});

const cardsPhoto = document.querySelectorAll('.card__photo');
const popupImg = document.querySelector('.popup_image')
const popupWindow = document.querySelector('.popup__window1');

function openPopupImg() {

    let a = this;
    let b = a.getAttribute("src");
    let c = a.parentNode;
    let d = c.querySelector('.card__title');
    let e = d.textContent;

    //popupWindow.innerHTML(<img className="photo" src="./images/казань.jpg" alt="Город Казань.">);
    popupWindow.insertAdjacentHTML('afterbegin', `<img class="photo" src=${b} alt=${e}>
                                                                    <figcaption class="popup__caption">${e}</figcaption>`);

    popupImg.classList.add('popup_opened');
}

for (let i = 0; i < cardsPhoto.length; i++) {
    cardsPhoto[i].addEventListener('click', openPopupImg)
};





function closedPopup(ev) {
    const evTarget = ev.currentTarget;

    if (evTarget.classList.contains('popup__button-closeImg')) {
       const ChildrenPopupOne = popupWindow.querySelector('.photo');
       const ChildrenPopupTwo = popupWindow.querySelector('.popup__caption');
       popupWindow.removeChild(ChildrenPopupOne);
       popupWindow.removeChild(ChildrenPopupTwo);
       popupImg.classList.remove('popup_opened');
   }
    const popupParent = evTarget.closest('.popup')
    popupParent.classList.remove('popup_opened');
};

const formElement = document.querySelector('.form_profile')
const nameInput = formElement.querySelector('.edit-profile__field_input_name')
const jobInput = formElement.querySelector('.edit-profile__field_input_status')

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const ded = nameInput.value;
    const rer = jobInput.value;
    PROFILE_NAME.textContent = ded;
    PROFILE_STATUS.textContent = rer;
    const eventTarget = evt.target;
    closedPopup({},eventTarget)

}

formElement.addEventListener('submit', handleFormSubmit);
