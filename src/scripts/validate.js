//*************************************************************************************************
//ФУНКЦИЯ СКРЫТЬ ОШИБКУ ПОЛЯ ИНПУТ
//*************************************************************************************************
function hideInputError(formElement, inputElement, parameters) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(parameters.inputErrorClass);
  errorElement.classList.remove(parameters.errorClass);
  errorElement.textContent = '';
};
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ПОКАЗАТЬ ОШИБКУ ПОЛЯ ИНПУТ
//*************************************************************************************************
function showInputError(formElement, inputElement, errorMessage, parameters) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(parameters.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(parameters.errorClass);
};
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ПРОВЕРКИ НА ВАЛИДНОСТЬ ОДНОГО ПОЛЯ ИНПУТ
//*************************************************************************************************
function isValid(formElement, inputElement, parameters) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, parameters);
  } else {
    hideInputError(formElement, inputElement, parameters);
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ПРОВЕРКИ НА ВАЛИДНОСТЬ ВСЕХ ПОЛЕЙ ФОРМЫ
//*************************************************************************************************
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ АКТИВНОСТИ КНОПКИ САБМИТ
//*************************************************************************************************
function toggleButtonState(inputList, buttonElement, parameters) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(parameters.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(parameters.inactiveButtonClass);
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////

//*************************************************************************************************
//ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ АКТИВНОСТИ КНОПКИ САБМИТ
//*************************************************************************************************
function setEventListeners(formElement, parameters) {
  const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
  const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, parameters);
      toggleButtonState(inputList, buttonElement, parameters);
    });
  });
};

///////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * ФУНКЦИЯ валидации полей форм
 *
 *  @param {Object} classSelectorsForValid - объект с перечислением селекторов классов
 *  для подставновки и поиска
 */
function enableValidation(parameters) {
  const formList = Array.from(document.querySelectorAll(parameters.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, parameters);
  });
};
///////////////////////////////////////////////////////////////////////////////////////////////////

export {toggleButtonState, isValid, enableValidation}