const addButton = document.querySelector(('.button_add'));

const initialCards = [
    {
        name: 'Хабаровск',
        link: './images/хабаровск.jpg'
    },
    {
        name: 'Свободный',
        link: './images/свободный.jpg'
    },
    {
        name: 'Владивосток',
        link: './images/владивосток.png'
    },
    {
        name: 'Благовещенск',
        link: './images/благовещенск.jpg'
    },
    {
        name: 'Москва',
        link: './images/москва.png'
    },
    {
        name: 'Казань',
        link: './images/казань.jpg'
    }
];

initialCards.forEach(function(item) {
    const img = item.link;
    const title = item.name;
    addsCard(img, title);
});

function addsCard(srcValue, titleValue) {
    const CARD_TEMPLATE = document.querySelector('#itemTemplate').content;
    const CARD_CONTAINER = document.querySelector('.card-grid');
    //const songTemplate = document.querySelector('#song-template').content;
    const cardElement = CARD_TEMPLATE.cloneNode(true);
    cardElement.querySelector('.card__photo').src = srcValue;
    cardElement.querySelector('.card__photo').alt = `Визуальное отображение места с наименованием ${titleValue}`;
    cardElement.querySelector('.card__title').textContent = titleValue;

   // debugger;
    cardElement.querySelector('.icon-heart').addEventListener('click', function (event) {
       const item = event.currentTarget;
        item.classList.toggle('icon-heart_active');
    })

    cardElement.querySelector('.card__photo').addEventListener('click', openPopupImg);

    cardElement.querySelector('.trash').addEventListener('click', deleteCard);







    CARD_CONTAINER.prepend(cardElement)
   // const iconsHeart = cardElement.querySelector('.icon-heart');
}

const formElementcard = document.querySelector('.form_place')
const titleInput = formElement.querySelector('.edit-profile__field_input_name')
const imgInput = formElement.querySelector('.edit-profile__field_input_status')

function handleFormSubmitT(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const itemTerget = evt.target;
    const parentsItem = itemTerget.closest('.popup');
    const titleForm = parentsItem.querySelector('.edit-profile__field_input_status');
    const imgSrcForm = parentsItem.querySelector('.edit-profile__field_input_name');

    addsCard(titleForm.value, imgSrcForm.value);
    //renderHasCard();

    imgSrcForm.value = '';
    titleForm.value = '';
    parentsItem.classList.remove('.popup_opened')


    closedPopup(evt);

}

formElementcard.addEventListener('submit', handleFormSubmitT);
