class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._endpoints = {
      user: '/users/me',
      avatar: '/users/me/avatar',
      cards: '/cards',
      likes: '/cards/likes',
    }
  }

  _checkResponse(response) {
    return response.ok ? response.json() : promise.reject('Ошибка подключения к серверу');
  }

  _request(endpointText, options) {
    return fetch(`${this._baseUrl}${endpointText}`, options).then(this._checkResponse)
  }


  getTotalInfoOOP() {
    return Promise.all([
      this._request(this._endpoints.user, {headers: this._headers}),
      this._request(this._endpoints.cards, {headers: this._headers})
    ])
  }


  sendProfileOOP(newNameUser, newAboutUser) {
    return this._request(this._endpoints.user, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newNameUser,
        about: newAboutUser,
      })
    })
  }

  sendAvatarOOP(newAvatar) {
    return this._request(this._endpoints.avatar, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar,
      })
    })
  }

  sendNewCardOOP(linkNewCard, nameNewCard) {
    return this._request(this._endpoints.cards, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: nameNewCard,
        link: linkNewCard,
      })
    })
  }

  sendCardDeletionOOP(cardId) {
    return this._request(`${this._endpoints.cards}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  sendStatusLikeOOP(cardId, activeLike)  {
    return this._request(`${this._endpoints.likes}/${cardId}`, {
      method: activeLike ? 'DELETE' : 'PUT',
      headers: this._headers,
    })
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25',
  headers: {
    authorization: '18a46d0a-0ce8-4b72-9f50-a83304389d2f',
    'Content-Type': 'application/json'
  }
});