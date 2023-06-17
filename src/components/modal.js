/**
 * Константа __selectorsForModal__ модержит селекторы и классы для работы с открытием и закрытием модальных окон.
 * @type {object}
 */
const selectorsForModal = {
  overlayClass: 'popup__shadow',
  closeButtonClass: 'popup__button-close',
  openingPopupClass: 'popup_opened',
  openingPopupSelector: '.popup_opened',
};

/**
 * Функция __handlePopupClose()__ запускает закрытие модального окна по клику на оверлей и по кнопке закрытия
 * @param {Event} evt - событие
 */
function handlePopupClose(evt) {
  const evTarget = evt.target;
  if (evTarget.classList.contains(selectorsForModal.overlayClass) || evTarget.classList.contains(selectorsForModal.closeButtonClass)) {
    closePopup(evt.currentTarget);
  }
};

/**
 * Функция __handleEscape()__ запускает закрытие модального окна по кнопке ESC
 * @param {Event} evt - событие
 */
function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(selectorsForModal.openingPopupSelector));
  }
  ;
};

/**
 * Функция __openPopup()__ открывает модальное окно
 * @param {Element} popup - модальное окно
 */
function openPopup(popup) {
  popup.classList.add(selectorsForModal.openingPopupClass);
  document.addEventListener('keyup', handleEscape);
  popup.addEventListener('click', handlePopupClose);
};

/**
 * Функция __closePopup()__ закрывает модальное окно
 * @param {Element} popup - модальное окно
 */
function closePopup(popup) {
  popup.classList.remove(selectorsForModal.openingPopupClass);
  document.removeEventListener('keyup', handleEscape);
  popup.removeEventListener('click', handlePopupClose);
};

/**
 * ЭКСПОРТ
 */
export {openPopup, closePopup};