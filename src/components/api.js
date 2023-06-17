/**
 * Константа __config__ шаблоны настройки подключения через fetch.
 * @type {object}
 */
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25',
  headers: {
    authorization: '18a46d0a-0ce8-4b72-9f50-a83304389d2f',
    'Content-Type': 'application/json'
  }
}

/**
 * Константа __endpoints__ шаблоны конечных точек url.
 * @type {object}
 */
const endpoints = {
  user: '/users/me',
  avatar: '/users/me/avatar',
  cards: '/cards',
  likes: '/cards/likes',
}

/**
 * Функция __checkResponse()__
 * @param {response} response - ответ
 */
function checkResponse(response) {
  return response.ok ? response.json() : promise.reject('Ошибка подключения к серверу');
}

/**
 * Функция __request()__
 * @param {string} endpointText - хвостовая часть Url
 * @param {Object} options - настройки подключения (options)
 */
function request(endpointText, options) {
  return fetch(`${config.baseUrl}${endpointText}`, options).then(checkResponse)
}

/**
 * Константа-шаблон __getTotalInfo()__
 */
const getTotalInfo = () => {
  return Promise.all([
    request(endpoints.user, {headers: config.headers}),
    request(endpoints.cards, {headers: config.headers})
  ])
}

/**
 * Константа-шаблон __sendProfile()__ функции подключения к серверу через fetch
 * и отправки данных о пользователе
 * @param {string} newNameUser - новое значение имени пользователя
 * @param {string} newAboutUser - новое значение информации о пользователе
 */
const sendProfile = (newNameUser, newAboutUser) => {
  return request(endpoints.user, {
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
  return request(endpoints.avatar, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatar,
    })
  })
}

/**
 * Константа-шаблон __sendPlace()__ функции подключения к серверу через fetch и отправки данных о новой карточке
 * @param {string} linkNewCard - новая ссылка на картинку места
 * @param {string} nameNewCard - новое имя для картинки места
 */
const sendNewCard = (linkNewCard, nameNewCard) => {
  return request(endpoints.cards, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: nameNewCard,
      link: linkNewCard,
    })
  })
}

/**
 * Константа-шаблон __sendCardDeletion()__ функции подключения к серверу через fetch
 * и удаления данных карточки из массива карточек
 * @param {string} cardId - идентификатор пользователя
 */
const sendCardDeletion = (cardId) => {
  return request(`${endpoints.cards}/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
}

/**
 * Константа-шаблон __sendStatusLike()__ функции подключения к серверу через fetch
 * и удаления или добавления данных в массив лайков карточки
 * @param {string} cardId - идентификатор карточки
 * @param {boolean} activeLike - флаг активности лайк
 */
const sendStatusLike = (cardId, activeLike) => {
  return request(`${endpoints.likes}/${cardId}`, {
    method: activeLike ? 'DELETE' : 'PUT',
    headers: config.headers,
  })
}

export {sendProfile, sendNewCard, sendCardDeletion, sendStatusLike, sendAvatar, getTotalInfo}
