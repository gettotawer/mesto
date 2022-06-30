export class UserInfo {
    constructor(userNameSelector, userDescriptionSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);
        this._profileAvatar = document.querySelector('.profile__avatar');
    }

    getUserInfo(){
        const info = {
            name: this._userName.textContent,
            description: this._userDescription.textContent
        }
        return info
    }

    setUserInfo(name, description, src){
        this._userName.textContent = name;
        this._userDescription.textContent = description;
        this._profileAvatar.style.backgroundImage = `url('${src}')`
    }
}