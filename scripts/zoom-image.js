function openPopupImg() {
	let a = this;
	let b = a.getAttribute("src");
	let c = a.parentNode;
	let d = c.querySelector('.card__title');
	let e = d.textContent;
	//popupWindow.innerHTML(<img className="photo" src="./images/казань.jpg" alt="Город Казань.">);
	POPUP_FIGURE.insertAdjacentHTML('afterbegin', `<img class="photo" src=${b} alt=${e}>
                                                                    <figcaption class="popup__caption">${e}</figcaption>`);
	POPUP_IMG.classList.add('popup_opened');
}