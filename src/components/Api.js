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
  //УДАЛИТЬ
  getUserInfo2() {
    return fetch(`${this._url}/users`, {
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res;
        }
        return Promise.reject(
          `Ошибка при загрузке данных пользователя: ${res.status}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // другие методы работы с API
}

//УДАЛИТЬ
[
  {
    likes: [
      {
        name: "Sergey Kazarinov",
        about: " Yandex.practicum student",
        avatar:
          "https://i.scdn.co/image/ab6761610000e5eb57c62faf97f45e233e74d77e",
        _id: "1f938e0ac95d82203f13dc8c",
        cohort: "cohort-45",
      },
      {
        name: "Пока что студент",
        about: "Яндекс",
        avatar:
          "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
        _id: "a32781edebad51fcf8aec29d",
        cohort: "cohort-45",
      },
    ],
    _id: "62cabdbbec3e430a1b8b0289",
    name: "Tomorrowland",
    link: "https://festway.ru/wp-content/uploads/2019/06/qiwaglglp9o1-1230x630.jpg",
    owner: {
      name: "Sergey Kazarinov",
      about: " Yandex.practicum student",
      avatar:
        "https://i.scdn.co/image/ab6761610000e5eb57c62faf97f45e233e74d77e",
      _id: "1f938e0ac95d82203f13dc8c",
      cohort: "cohort-45",
    },
    createdAt: "2022-07-10T11:53:31.867Z",
  },
];
