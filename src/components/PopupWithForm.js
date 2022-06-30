import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor({ submit }, popupSelector){
        super(popupSelector)

        this._submit = submit;
        this._popupForm = this._popup.querySelector('.popup__submit-form');
        this.popupInputs = this._popupForm.querySelectorAll('.popup__input');
        this._popupButton = this._popupForm.querySelector('.popup__submit-button');
        this._popupButtonText = this._popupButton.textContent;
    }

    _getInputValues(){

        this._formValues = {};

        this.popupInputs.forEach( (input) => {
            this._formValues[input.name] = input.value;
        })

        return this._formValues
    }

    setEventListeners(){
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._getInputValues());
        })
    }
    
    waiting(isWaiting){
        if(isWaiting){
            this._popupButton.textContent = 'Сохранение...';
        } else{
            this._popupButton.textContent = this._popupButtonText
        }
    }

    close(){
        super.close();
        this._popupForm.reset();
    }
}