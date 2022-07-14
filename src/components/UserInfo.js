export default class UserInfo {
  constructor(profilePersonName, profileDescription, profileAvatar) {
    this._profilePersonName = document.querySelector(profilePersonName);
    this._profileDescription = document.querySelector(profileDescription);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  renderUserInfo = ( {name, about, avatar} ) => {
    this._profilePersonName.textContent = name;
    this._profileDescription.textContent = about;
    this._profileAvatar.src = avatar
  }

  getUserInfo = ( {name, about} ) => {
    const profileInfo = {};
    profileInfo["nameInput"] = name
    profileInfo["descriptionInput"] = about
    return profileInfo;
  }

  setUserInfo = ( {name, about} ) => {
    this._profilePersonName.textContent = name;
    this._profileDescription.textContent = about;
  };
}
