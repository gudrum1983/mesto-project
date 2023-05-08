function deleteCard (ev) {
    const itemButton = ev.target;
    const card = itemButton.closest('.card');
    //const title = card.querySelector('.card__title').textContent;
    //console.log(title);
    card.remove();
}