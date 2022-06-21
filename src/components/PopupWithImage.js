import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);

        this._popupCardSubtitle = this._popup.querySelector('.popup-card__subtitle');
        this._popupCardImage = this._popup.querySelector('.popup-card__image');
    }

    open(name, link){
        this._popupCardSubtitle.textContent = name;
        this._popupCardImage.setAttribute('src', link);
        this._popupCardImage.setAttribute('alt', name);
        
        super.open();
    }
}