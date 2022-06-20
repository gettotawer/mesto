import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor({ submit }, popupSelector){
        super(popupSelector)

        this._submit = submit;
        this.popupInputs = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues(){

        this._inputList = this._popup.querySelectorAll('.popup__input');

        this._formValues = {};

        this._inputList.forEach( (input) => {
            this._formValues[input.name] = input.value;
        })

        return this._formValues
    }

    setEventListeners(){
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            this._getInputValues();
            this._submit(evt, this._formValues)
        })
    }

    close(){
        super.close()
        this._inputList.forEach( (input) => {
            input.value = '';
        })
    }
}