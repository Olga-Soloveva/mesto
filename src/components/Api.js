export default class Api {
  constructor(options) {
    this._url = options.url;
    this._authorization = options.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  }

  editUserInfo({ nameInput, descriptionInput }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput,
        about: descriptionInput,
      }),
    }).then(this._checkResponse);
  }

  editAvatarInfo({ avatarInput }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarInput,
      }),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  }

  sendCardInfo({ placeInput, linkInput }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: placeInput,
        link: linkInput,
      }),
    }).then(this._checkResponse);
  }

  deleteCard({ cardId }) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  }

  likeCard({ cardId }) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  }

  deleteLike({ cardId }) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  }
}
