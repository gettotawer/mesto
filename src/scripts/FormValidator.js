export class FormValidator{

    constructor(obj, formElement){
        this._inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
        this._button = formElement.querySelector(obj.submitButtonSelector);
        this._formElement = formElement;
        this._inputSelector = obj.inputSelector;
        this._inactiveButtonClass = obj.inactiveButtonClass;
        this._inputErrorClass = obj.inputErrorClass;
    }


    _setEventListeners(formElement, inputSelector, button, inactiveButtonClass, inputErrorClass){
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._handleValidate(formElement, inputElement, button, inputList, inactiveButtonClass, inputErrorClass)
            })
        })
    
    }

    _toggleButtonState(inputList, buttonElement, inactiveButtonClass){
        if(this._hasInvalidInput(inputList)){
         buttonElement.classList.add(inactiveButtonClass);
         buttonElement.disabled = true;
       } else {
         buttonElement.classList.remove(inactiveButtonClass);
         buttonElement.disabled = false;
       }
     }

     _hasInvalidInput(inputList){
        return inputList.some((inputElement)=>{
        return !inputElement.validity.valid;
        })
    }

    _handleValidate(formElement, inputElement, button, inputList, inactiveButtonClass, inputErrorClass){
        this._deactivateError(inputElement, button, inputList, inactiveButtonClass, inputErrorClass);
        this._validate(formElement, inputElement, button, inputList, inactiveButtonClass, inputErrorClass);
    }
    
    _validate(formElement, inputElement, button, inputList, inactiveButtonClass, inputErrorClass){
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        if(!inputElement.checkValidity()){
            errorElement.textContent = inputElement.validationMessage;
            this._activateError(errorElement, inputErrorClass);
            this._toggleButtonState(inputList, button, inactiveButtonClass);
        } 
    }
    
    _activateError(element, inputErrorClass){
        element.parentNode.classList.add(inputErrorClass);
    }
    
    _deactivateError(inputElement, button, inputList, inactiveButtonClass, inputErrorClass){
        this._toggleButtonState(inputList, button, inactiveButtonClass)
        inputElement.parentNode.classList.remove(inputErrorClass);
        const errorElement = document.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = '';
    }

    enableValidation(){
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._toggleButtonState(this._inputList, this._button, this._inactiveButtonClass);
        });
        this._toggleButtonState(this._inputList, this._button, this._inactiveButtonClass);
        this._setEventListeners(this._formElement, this._inputSelector, this._button, this._inactiveButtonClass, this._inputErrorClass);
    }
}