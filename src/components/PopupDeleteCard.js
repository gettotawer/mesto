import { Popup } from "./Popup.js";

export class popupDeleteCard extends Popup{
    constructor({ deleteCard }, popupSelector){
        super(popupSelector)

        this._submit = deleteCard;
    }

    open(evt, cardId){
        this._evt = evt;
        this._cardId = cardId;
        console.log(this._cardId);
        super.open()
    }

    setEventListeners(){
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._evt.target.closest('.element').remove()
            this._submit(this._cardId);
            this.close();
        })
    }
}