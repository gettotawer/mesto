import { initialCards } from "./initialCards.js";
import { Card } from "./cards.js";
import { FormValidator } from "./validation.js";

// ДОМ элементы

const popupProfile = document.querySelector('.popup-profile'); // Попап редактирования профиля
const popupElement = document.querySelector('.popup-element'); //Попап добавления карточки
const profileName = document.querySelector('.profile__name'); //Имя профиля
const profileDescription = document.querySelector('.profile__description'); //Описание профиля
const popupName = document.querySelector('.popup-profile__form_el_name'); //Окно редактирования имени профиля
const popupDescription = document.querySelector('.popup-profile__form_el_description'); //Окно редактирования описания профиля
const popupElementName = document.querySelector('.popup-element__form_el_name'); //Название карточки
const popupElementLink = document.querySelector('.popup-element__form_el_link'); // Ссылка на изображение для карточки
const popupCard = document.querySelector('.popup-card'); // Попап карточки с картинкой



// Функция изменения профиля
function profileChangeSubmit (evt){
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup(popupProfile);
}

//Показывает попап редактирвоания профиля / добавления карточки
export function openPopup (popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupOverlay)
    document.addEventListener('keydown', closePopupEsc)
 }

 //Скрывает попап редактирвоания профиля / добавления карточки
 function closePopup (popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', closePopupOverlay)
    document.removeEventListener('keydown', closePopupEsc)
 }

// Закрывает попап, если был сделан клин вне окна редактирования профиля
function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget){
        closePopup(evt.target);
    }
}

//Закрытие попапа, если была нажата кнопка esc
function closePopupEsc(evt){
    if(evt.key === 'Escape'){
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}


//Добавление новой карточки
function handleSubmitAddElementForm(evt){
    evt.preventDefault();
    const cardData = {
        name: `${popupElementName.value}`,
        link: `${popupElementLink.value}`,
    }

    const newCard = new Card(cardData)
    const cardElement = newCard.generateCard();
    document.querySelector('.elements').prepend(cardElement)
    closePopup(popupElement);
    popupElementName.value = '';
    popupElementLink.value = '';
}



document.querySelector('.popup-card__close-button').addEventListener('click', (evt) => {
    evt.preventDefault();
    closePopup(popupCard);
})

popupName.value = profileName.textContent;
popupDescription.value = profileDescription.textContent;

// Вызов попапа редактирвоание профиля
document.querySelector('.profile__edit-button').addEventListener('click', ()=>{
    openPopup(popupProfile);
});
// Закрытие попапа редактирования профиля
document.querySelector('.popup-profile__close-button').addEventListener('click', (evt) => {
    evt.preventDefault();
    closePopup(popupProfile);
});
// Субмит формы профиля
document.querySelector('.popup-profile__form').addEventListener('submit', function(event){
    profileChangeSubmit(event);
});

//Добавление карточки
document.querySelector('.profile__add-button').addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopup(popupElement);
});

// Кнопка закрытия попапа добавления карточки
document.querySelector('.popup-element__close-button').addEventListener('click', (evt) => {
    evt.preventDefault();
    closePopup(popupElement);
});


//Субмит попапа
document.querySelector('.popup-element__form').addEventListener('submit', function(event){
    handleSubmitAddElementForm(event);
});

// Обходим массив с карточками

initialCards.forEach((cardsData) =>{
    const card = new Card(cardsData)
    const cardElement = card.generateCard();
    document.querySelector('.elements').prepend(cardElement)
})

const formList = Array.from(document.querySelectorAll('.popup__submit-form'));
const selectorsObject = {
    inputSelector: '.popup__form',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input-container_invalid',
  }
formList.forEach((formItem)=>{
    const formValidator = new FormValidator (selectorsObject);
    formValidator.enableValidation(formItem);
})