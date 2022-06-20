import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
    }

    open(name, link){
        this._popupCardSubtitle.textContent = name;
        this._popupCardImage.setAttribute('src', link);
        this._popupCardImage.setAttribute('alt', name);
        
        super.open();
    }
}