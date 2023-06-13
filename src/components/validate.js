import {selectorsForValid} from "./utils";

/**
 *  Функция __disableSubmitButton()__ отключает кнопку сабмит
 *  @param {Element} buttonElement - кнопка сабмит
 *  @param {Object} parameters - объект с перечислением селекторов классов
 *  для подставновки классов и поиска элементов по классам
 */
function disableSubmitButton(buttonElement, parameters) {
  buttonElement.disabled = true;
  buttonElement.classList.add(parameters.inactiveButtonClass);
}

/**
 * Функция __hideInputError()__ скрывает ошибку
 *  @param {Element} formElement - форма
 *  @param {Element} inputElement - поле ввода
 *  @param {Object} parameters - объект с перечислением селекторов классов
 *  для подставновки классов и поиска элементов по классам
 */
function hideInputError(formElement, inputElement, parameters) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(parameters.inputErrorClass);
  errorElement.classList.remove(parameters.errorClass);
  errorElement.textContent = '';
};

/**
 * Функция __showInputError()__ показывает ошибку
 *  @param {Element} formElement - форма
 *  @param {Element} inputElement - поле ввода
 *  @param {String} errorMessage - строка с текстом ошибки
 *  @param {Object} parameters - объект с перечислением селекторов классов
 *  для подставновки классов и поиска элементов по классам
 */
function showInputError(formElement, inputElement, errorMessage, parameters) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(parameters.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(parameters.errorClass);
};

/**
 * Функция __isValid()__ обрабатывает поля ввода и текстовые ошибки к ним в зависимости от значения
 * валидности полей. Показывает и скрывает элементы ошибок
 *  @param {Element} formElement - форма
 *  @param {Element} inputElement - поле ввода
 *  @param {Object} parameters - объект с перечислением селекторов классов
 *  для подставновки классов и поиска элементов по классам
 */
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

/**
 * Функция __hasInvalidInput()__ обрабатывает полученный массив полей на валидность
 * @return {boolean} - возвращает true если хоть одно поле невалидно
 * @param {Array} inputList - массив полей ввода
 */
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

/**
 * Функция __toggleButtonState()__ обрабатывает кнопку сабмит в зависимости от значения валидности полей формы
 *  @param {Array} inputList - массив полей ввода
 *  @param {Element} buttonElement - кнопка сабмит
 *  @param {Object} parameters - объект с перечислением селекторов классов
 *  для подставновки классов и поиска элементов по классам
 */
function toggleButtonState(inputList, buttonElement, parameters) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, parameters)
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(parameters.inactiveButtonClass);
  }
};

/**
 * Функция __setEventListeners()__ добавляет слушателей на поля ввода
 *  где обрабатываются найденные в форме поля ввода и кнопка сабмит.
 *  @param {Element} formElement - форма
 *  @param {Object} parameters - объект с перечислением селекторов классов
 *  для подставновки классов и поиска элементов по классам
 */
function setEventListeners(formElement, parameters) {
  const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
  const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, parameters);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, parameters);
      toggleButtonState(inputList, buttonElement, parameters);
    });
  });
};

/**
 *  Функция __enableValidation()__ запускает процесс сборки элементов для дальнейшей обработки
 *  с проверкой на валидность.
 *  Формируется и обрабатывается массив форм требующих валидацию
 *  @param {Object} parameters  - объект с перечислением селекторов классов
 *  для подставновки классов и поиска элементов по классам
 */
function enableValidation(parameters) {
  const formList = Array.from(document.querySelectorAll(parameters.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, parameters);
  });
};

/**
 * Функция __сheckErrorsForm()__ очищает форму от ошибок и восстанавивает
 * стиль кнопки сабмит по умолчанию
 * @param {Element} formElement - форма
 * @param {Object} parameters - parameters – объект с перечислением селекторов классов для подставновки
 * классов и поиска элементов по классам
 */
function checkErrorsForm(formElement, parameters) {
  const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
  const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
  const noValueInputs = inputList.every(input => {
    return (input.value.length === 0)
  })
  if (!noValueInputs)  {
    toggleButtonState(inputList, buttonElement, parameters);
    inputList.forEach((inputElement) => {
      isValid(formElement, inputElement, parameters);
      toggleButtonState(inputList, buttonElement, parameters);
    });
  } else {
    disableSubmitButton(buttonElement, parameters)
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, parameters);
    })

  }
};


/**
 * ЭКСПОРТ
 * */
export {toggleButtonState, isValid, enableValidation, checkErrorsForm, disableSubmitButton}