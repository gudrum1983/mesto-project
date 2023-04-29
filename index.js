let popup = document.querySelector('.popup');


let buttonClose = document.querySelector('.popup__button-close');

let buttonEdit = document.querySelector('.profile__button-edit');
let profileName = document.querySelector('.profile__name');

console.log(buttonEdit);
console.log(profileName);


function openPopup() {
    popup.classList.add('popup_opened');
    const profileName = document.querySelector('.profile__name');
    const profileStatus = document.querySelector('.profile__status');

    const nameInput = document.querySelector('.edit-profile__field_input_name');
    nameInput.value = profileName.textContent;
    const jobInput = document.querySelector('.edit-profile__field_input_status');
    jobInput.value = profileStatus.textContent;
}

buttonEdit.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}

buttonClose.addEventListener('click', closePopup);


/*
// Находим форму в DOM
const formElement = document.querySelector('.popup');
// Находим поля формы в DOM
const nameInput = document.querySelector('.edit-profile__field_input_name');
const jobInput = document.querySelector('.edit-profile__field_input_status');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
    function handleFormSubmit(evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        // Так мы можем определить свою логику отправки.
        // О том, как это делать, расскажем позже.

        // Получите значение полей jobInput и nameInput из свойства value

        // Выберите элементы, куда должны быть вставлены значения полей

        // Вставьте новые значения с помощью textContent
    }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);*/
