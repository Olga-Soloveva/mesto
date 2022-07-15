export default class Api {
  constructor(options) {
    this._url = options.url;
    this._authorization = options.authorization;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `Ошибка при загрузке данных пользователя на сервер: ${res.status}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `Ошибка при изменении информации пользователя: ${res.status}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `Ошибка при изменении аватара пользователя: ${res.status}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `Ошибка при загрузке массива карточек: ${res.status}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `Ошибка при загрузке данных карточки на сервер: ${res.status}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard({ cardId }) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `Ошибка при попытке удаления карточки c сервера: ${res.status}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  likeCard({ cardId }) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `Ошибка при попытке поставить лайк карточке: ${res.status}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteLike({ cardId }) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          `Ошибка при попытке удалить лайк у карточки: ${res.status}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
