import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor({ submit }, popupSelector){
        super(popupSelector)

        this._submit = submit;
        this._popupForm = this._popup.querySelector('.popup__submit-form')
        this.popupInputs = this._popupForm.querySelectorAll('.popup__input');
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

    close(){
        super.close();
        this._popupForm.reset();
    }
}