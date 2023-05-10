//ФУНКЦИЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА УВЕЛИЧЕНИЯ ИЗОБРАЖЕНИЯ КАРТОЧКИ МЕСТА
function openPopupZoomImg(event) {
    const imgTarget = event.currentTarget;
    const imgLink = imgTarget.getAttribute("src");
    const card = imgTarget.parentNode;
    const title = card.querySelector('.card__title');
    const titleText = title.textContent;
    const textInsert = `<img class="photo" src=${imgLink} alt=${titleText}>
                               <figcaption class="popup__caption">${titleText}</figcaption>`
    popupFigure.insertAdjacentHTML('afterbegin', textInsert);
    popupZoomImg.classList.add('popup_opened');
}