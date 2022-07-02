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

  setUserInfo = (nameInput, descriptionInput) => {
    this._profilePersonName.textContent = nameInput;
    this._profileDescription.textContent = descriptionInput;
  };
}
