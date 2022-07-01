import { Popup } from "./Popup.js";

export class popupDeleteCard extends Popup{
    constructor({ deleteCard }, popupSelector){
        super(popupSelector)

        this._popupButton = this._popup.querySelector('.popup__submit-button');
        this._submit = deleteCard;
    }

    open(evt, cardId){
        this._evt = evt;
        this._cardId = cardId;
        super.open()
    }


    waiting(isWaiting){
        if(isWaiting){
            this._popupButton.textContent = 'Удаление...';
        } else{
            this._popupButton.textContent = this._popupButtonText
        }
    }

    setEventListeners(){
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            //this._evt.target.closest('.element').remove()
            this._submit(this._cardId, this._evt);
        })
    }
}