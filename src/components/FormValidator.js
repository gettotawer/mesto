export class FormValidator{

    constructor(obj, formElement){
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
        this._button = formElement.querySelector(obj.submitButtonSelector);
        this._inputSelector = obj.inputSelector;
        this._inactiveButtonClass = obj.inactiveButtonClass;
        this._inputErrorClass = obj.inputErrorClass;
    }


    _setEventListeners(){
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._handleValidate(inputElement)
            })
        })
    
    }

    _toggleButtonState(){
        if(this._hasInvalidInput(this._inputList)){
            this._button.classList.add(this._inactiveButtonClass);
            this._button.disabled = true;
       } else {
        this._button.classList.remove(this._inactiveButtonClass);
        this._button.disabled = false;
       }
     }

     _hasInvalidInput(){
        return this._inputList.some((inputElement)=>{
        return !inputElement.validity.valid;
        })
    }

    _handleValidate(inputElement){
        this._deactivateError(inputElement);
        this._validate(inputElement);
    }
    
    _validate(inputElement){
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        if(!inputElement.checkValidity()){
            errorElement.textContent = inputElement.validationMessage;
            this._activateError(errorElement);
            this._toggleButtonState();
        } 
    }
    
    _activateError(errorElement){
        errorElement.parentNode.classList.add(this._inputErrorClass);
    }
    
    _deactivateError(inputElement){
        this._toggleButtonState()
        inputElement.parentNode.classList.remove(this._inputErrorClass);
        const errorElement = document.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = '';
    }

    enableValidation(){
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            console.log(evt)
            this._toggleButtonState();
        });
        this._toggleButtonState();
        this._setEventListeners();
    }
}