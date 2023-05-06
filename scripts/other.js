//debugger;
const buttonsMapping = document.querySelectorAll('.button_open');
console.log(buttonsMapping)

function openedPopup() {
    const a = this.form.closest('.popup')
    if (a.classList.contains('popup_profile')) {
        const profileName = document.querySelector('.profile__name');
        const profileStatus = document.querySelector('.profile__status');
        const nameInput = document.querySelector('.edit-profile__field_input_name');
        nameInput.value = profileName.textContent;
        const jobInput = document.querySelector('.edit-profile__field_input_status');
        jobInput.value = profileStatus.textContent;
    }
    a.classList.add('popup_opened')
};

buttonsMapping.forEach(function(item) {
    console.log(item);
    item.addEventListener('click', openedPopup)
});


/*открытие попапа картинки*/
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
}