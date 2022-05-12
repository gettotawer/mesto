//Создаем функцию включения валидации
function enableValidation(obj){
    const formSelector = document.querySelectorAll(obj.formSelector);
    const formList = Array.from(formSelector);
    const inputSelector = obj.inputSelector;
    const submitButtonSelector = obj.submitButtonSelector;
    const inactiveButtonClass = obj.inactiveButtonClass;
    const inputErrorClass = obj.inputErrorClass;
    
    //Каждой форме добавляем слушатель события submit
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            toggleButtonState(inputList, button, inactiveButtonClass);
        });
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const button = formElement.querySelector(submitButtonSelector);
        toggleButtonState(inputList, button, inactiveButtonClass);
        setEventListeners(formElement, inputSelector, button, inactiveButtonClass, inputErrorClass);
    });

}

function setEventListeners(formElement, inputSelector, button, inactiveButtonClass, inputErrorClass){
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            handleValidate(formElement, inputElement, button, inputList, inactiveButtonClass, inputErrorClass)
        })
    })

}

 const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
      if(hasInvalidInput(inputList)){
       buttonElement.classList.add(inactiveButtonClass);
       buttonElement.disabled = true;
     } else {
       buttonElement.classList.remove(inactiveButtonClass);
       buttonElement.disabled = false;
       
     }
   }

    const hasInvalidInput = (inputList) => {
        return inputList.some((inputElement)=>{
        return !inputElement.validity.valid;
        })
    }


//Вызываем для каждого инпута 2 функции
function handleValidate(formElement, inputElement, button, inputList, inactiveButtonClass, inputErrorClass){
    deactivateError(inputElement, button, inputList, inactiveButtonClass);
    validate(formElement, inputElement, button, inputList, inactiveButtonClass, inputErrorClass);
}

function validate(formElement, inputElement, button, inputList, inactiveButtonClass, inputErrorClass){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if(!inputElement.checkValidity()){
        errorElement.textContent = inputElement.validationMessage;
        activateError(errorElement, inputErrorClass);
        toggleButtonState(inputList, button, inactiveButtonClass);
    } 
}

function activateError(element, inputErrorClass){
    element.parentNode.classList.add(inputErrorClass);
}

function deactivateError(inputElement, button, inputList, inactiveButtonClass, inputErrorClass){
    toggleButtonState(inputList, button, inactiveButtonClass)
    inputElement.parentNode.classList.remove(inputErrorClass);
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
}

enableValidation({
    formSelector: '.popup__submit-form',
    inputSelector: '.popup__form',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input-container_invalid',
  }); 