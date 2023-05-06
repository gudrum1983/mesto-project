const PROFILE_NAME = document.querySelector('.profile__name');
const PROFILE_STATUS = document.querySelector('.profile__status');





const buttonsClose = document.querySelectorAll('.popup__button-close');

for (let i = 0; i < buttonsClose.length; i++) {
    buttonsClose[i].addEventListener('click', closedPopup);
}
;

function closedPopup() {
    let popupParent = this.closest('.popup')
    popupParent.classList.remove('popup_opened');
};


// Находим форму в DOM
const formElement = document.querySelector('.form_profile')
// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.edit-profile__field_input_name')
// Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.edit-profile__field_input_status')
// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    const ded = nameInput.value;
    const rer = jobInput.value;
    // Получите значение полей jobInput и nameInput из свойства value

    PROFILE_NAME.textContent = ded;
    // Выберите элементы, куда должны быть вставлены значения полей
    PROFILE_STATUS.textContent = rer;
    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);