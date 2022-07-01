export default class UserInfo {
  constructor(profilePersonName, profileDescription) {
    this._profilePersonName = document.querySelector(profilePersonName);
    this._profileDescription = document.querySelector(profileDescription);
  }

  getUserInfo() {
    const profileInfo = {};

    profileInfo["nameinput"] = this._profilePersonName.textContent;
    profileInfo["descriptioninput"] = this._profileDescription.textContent;

    return profileInfo;
  }

  // Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

  setUserInfo = (nameinput, descriptioninput) => {
    this._profilePersonName.textContent = nameinput;
    this._profileDescription.textContent = descriptioninput;
  };
}
