let popupPr = document.querySelector('.popup_profile');
let buttonEditPr = document.querySelector('.profile__button-edit');
let buttonClosePr = document.querySelector('.popup__button-close');

/*открытие попапа профайла*/


buttonEditPr.addEventListener('click', openPopupPr);
function openPopupPr() {
    popupPr.classList.add('popup_opened');
    const profileName = document.querySelector('.profile__name');
    const profileStatus = document.querySelector('.profile__status');

    const nameInput = document.querySelector('.edit-profile__field_input_name');
    nameInput.value = profileName.textContent;
    const jobInput = document.querySelector('.edit-profile__field_input_status');
    jobInput.value = profileStatus.textContent;
}



buttonClosePr.addEventListener('click', closedPopupPr);


function closedPopupPr() {
    popupPr.classList.remove('popup_opened');
}


/*открытие и закрытие попапа картинки*/

const cardsPhoto = document.querySelectorAll('.card__photo');
const popupImg = document.querySelector('.popup_image')
const buttonCloseImg = document.querySelector('.popup__button-closeImg');

function openPopupImg() {
    popupImg.classList.add('popup_opened');
}

for (let i = 0; i < cardsPhoto.length; i++) {
    cardsPhoto[i].addEventListener('click', openPopupImg)
}


buttonCloseImg.addEventListener('click', closedPopupImg);

function closedPopupImg() {
   popupImg.classList.remove('popup_opened')
}

/*Открытие и закрытие попапа места*/

const buttonPl = document.querySelector('.profile__button-add');
const popupPl = document.querySelector('.popup_place');
const buttonClosePl = document.querySelector('.popup__button-closePl');

buttonPl.addEventListener('click', openPopupPl);
buttonClosePl.addEventListener('click', closedPopupPl);

function openPopupPl() {
    popupPl.classList.add('popup_opened')
}

function closedPopupPl() {
    popupPl.classList.remove('popup_opened')
}


/*сердечки*/

let iconsHeart = document.querySelectorAll('.icon-heart')
for (let i = 0; i < iconsHeart.length; i++) {
    iconsHeart[i].addEventListener('click', iconsHeart[i].classList.toggle('icon-heart_active'))
}


let iconHeart = document.querySelector('.icon-heart')
iconHeart.addEventListener('click', openHeart)

/*

let iconsHeart = document.querySelectorAll('.icon-heart')

for (let i = 0; i < iconsHeart.length; i++) {
    iconsHeart[i].addEventListener('click', iconsHeart[i].classList.toggle('icon-heart_active'))
}
*/

function openHeart() {
    iconHeart.classList.toggle('icon-heart_active');
}

/*
for (let i = 0; i < buttonsClose.length; i++) {
    let buttonClose = buttonsClose[i];
    buttonClose.addEventListener('click', findParent(buttonClose))
}


function findParent(buttonClose) {

    console.dir(buttonClose)



    let potentialParent = buttonClose.parentNode;
    let potentialParent1 = buttonClose.offsetParent;
    let potentialParent2 = buttonClose.parentNode.parentNode.parentNode;

    if (potentialParent.classList.contains('popup')) {

        console.log(potentialParent.classList);
        closedPopup(potentialParent);
    } else if (potentialParent1.classList.contains('popup')) {
        console.log(potentialParent1.classList);
        closedPopup(potentialParent1);
    } else if (potentialParent2.classList.contains('popup')) {
        console.log(potentialParent2.classList);
        closedPopup(potentialParent2);
    } else {
        console.log(`NOT`);
    }
}

function closedPopup(element) {
    element.classList.remove('popup_opened');}
*/
