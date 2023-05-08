//debugger;



/*открытие попапа картинки*/
/*
const cardsPhoto = document.querySelectorAll('.card__photo');
const popupImg = document.querySelector('.popup_image')
const popupWindow = document.querySelector('.popup__window1');
*/
function openPopupImg(eve) {

    let a = eve.currentTarget;
    let b = a.getAttribute("src");
    let c = a.parentNode;
    let d = c.querySelector('.card__title');
    let e = d.textContent;

    //popupWindow.innerHTML(<img className="photo" src="./images/казань.jpg" alt="Город Казань.">);
    popupWindow.insertAdjacentHTML('afterbegin', `<img class="photo" src=${b} alt=${e}>
                                                                    <figcaption class="popup__caption">${e}</figcaption>`);

    popupImg.classList.add('popup_opened');
}
/*
for (let i = 0; i < cardsPhoto.length; i++) {
    cardsPhoto[i].addEventListener('click', openPopupImg)
}

buttonCloseImg.addEventListener('click', closedPopupImg);

function closedPopupImg() {
    //debugger;

    const ChildrenPopupOne = popupWindow.querySelector('.photo');
    const ChildrenPopupTwo = popupWindow.querySelector('.popup__caption');

    popupWindow.removeChild(ChildrenPopupOne);
    popupWindow.removeChild(ChildrenPopupTwo);
    popupImg.classList.remove('popup_opened')


}*/
