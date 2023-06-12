import {userID} from "./index";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25',
  headers: {
    authorization: '18a46d0a-0ce8-4b72-9f50-a83304389d2f',
    'Content-Type': 'application/json'
  }
}

const result = (response) => {
  return response.ok ? response.json() : promise.reject(response);
}

/**
 * Константа-шаблон __getStart()__ функции подключения к серверу через fetch для получения данных
 * @param {string} endTextLink - хвостовая часть Url
 */
const getInfo = (endTextLink) => {
  return fetch(`${config.baseUrl}${endTextLink}`, {
    headers: config.headers
  })
    .then(result)
}

/**
 * Константа-шаблон __getTotalInfo()__ для получения всех данных по юзеру и карточкам
 */
const getTotalInfo = () => {
  return Promise.all([getInfo('/users/me'), getInfo('/cards')])
}

/**
 * Константа-шаблон __sendProfile()__ функции подключения к серверу через fetch
 * и отправки данных о пользователе
 * @param {string} newNameUser - новое значение имени пользователя
 * @param {string} newAboutUser - новое значение информации о пользователе
 */
const sendProfile = (newNameUser, newAboutUser) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newNameUser,
      about: newAboutUser,
    })
  })
}

/**
 * Константа-шаблон __sendAvatar()__ функции подключения к серверу через fetch
 * и отправки данных о новой аватарке пользователя
 * @param {string} newAvatar - новая ссылка на картинку пользователя
 */
const sendAvatar = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatar
    })
  })
}

/**
 * Константа-шаблон __sendPlace()__ функции подключения к серверу через fetch и отправки данных о новой карточке
 * @param {string} linkNewCard - новая ссылка на картинку места
 * @param {string} nameNewCard - новое имя для картинки места
 */
const sendNewCard = (linkNewCard, nameNewCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: nameNewCard,
      link: linkNewCard,
    })
  })
}

/**
 * Константа-шаблон __startDeleteCard()__ функции подключения к серверу через fetch
 * и удаления данных карточки из массива карточек
 * @param {string} cardId - идентификатор пользователя
 */
const sendCardDeletion = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
};

/**
 * Константа-шаблон __sendStatusLike()__ функции подключения к серверу через fetch
 * и удаления или добавления данных в массив лайков карточки
 * @param {string} cardId - идентификатор карточки
 * @param {boolean} activeLike - флаг активности лайк
 */
const sendStatusLike = (cardId,activeLike) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: activeLike ? 'DELETE' : 'PUT',
    headers: config.headers,
  })
}

export {sendProfile, sendNewCard, sendCardDeletion, sendStatusLike, sendAvatar, userID, getTotalInfo, result}
