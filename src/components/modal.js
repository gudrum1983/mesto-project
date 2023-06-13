import {checkErrorsForm} from "./validate";

/**
 * Функция __closePopup()__ закрывает попап
 * @param {Element} popup - попап
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', keyHandler);
  popup.removeEventListener('click', clickHandler);

};
/**
 * Функция __clickHandler()__ запускает закрытие попапа по клику на оверлей
 * @param {Event} evt - событие
 */
function clickHandler(evt) {
  const evTarget = evt.target;
  if (evTarget.classList.contains('popup__shadow') || evTarget.classList.contains('popup__button-close')) {
    closePopup(evt.currentTarget);
  }
};

/**
 * Функция __keyHandler()__ запускает закрытие попапа по кнопке ESC
 * @param {Event} evt - событие
 */
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
  ;
};

/**
 * Функция __openPopup()__ открывает попап
 * @param {Element} popup - попап
 */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', keyHandler);
  popup.addEventListener('click', clickHandler);
};

/**
 * Функция __closedPopupUX()__ закрывает попап и возвращает значения кнопке сабмит
 * @param {Element} button - кнопка сабмита
 */
function closePopupUX(button) {
  button.textContent = 'Сохранить';
  const popup = button.closest('.popup');
  const form = popup.querySelector('.form__admin');
  form.reset();
  button.disabled = false;
  closePopup(popup);
}

/**
 * ЭКСПОРТ
 */
export {openPopup, closePopup, closePopupUX, keyHandler, clickHandler};