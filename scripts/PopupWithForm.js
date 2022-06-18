import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor({ submit }, popupSelector){
        super(popupSelector)

        this._submit = submit;
        this.popupElementName = document.querySelector('.popup-element__form_el_name'); //Название карточки
        this.popupElementLink = document.querySelector('.popup-element__form_el_link'); // Ссылка на изображение для карточки
        this.popupName = document.querySelector('.popup-profile__form_el_name'); //Окно редактирования имени профиля
        this.popupDescription = document.querySelector('.popup-profile__form_el_description'); //Окно редактирования описания профиля
    }

    _getInputValues(){
        const valuesObj = {
            nameValue: this._popup.children[0].children[0].children[1].children[0].value,
            descriptionValue: this._popup.children[0].children[0].children[2].children[0].value
        }

        return valuesObj
    }

    setEventListeners(){
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submit)
    }
}