import '../pages/index.css';

//Импортируем классы
import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

//Селекторы
const cardTemplateSelector = '#template-element';
const containerSelector = '.elements';
const profileNameSelector = '.profile__name';
const profileDescriptionSelector = '.profile__description';
const popupCardSelector = '.popup-card';
const elementPopupSelector = '.popup-element';
const popupProfileSelector = '.popup-profile'; 
const selectorsObject = {
    inputSelector: '.popup__form',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input-container_invalid',
  }

//Создаем необходимые классы
const userInfo = new UserInfo (profileNameSelector, profileDescriptionSelector);
//Создаем экземпляр класса вставки в разметку
const cardList = new Section({ items: initialCards,
    render: (cardItem) => {
        const card = new Card(cardItem, cardTemplateSelector, handleCardClick)
        const cardElement = card.generateCard();
        cardList.addItem(cardElement)
    }}, containerSelector)
    
    //Создаем экземпляр редактирования профиля   
    const popupProfile = new PopupWithForm({submit: (evt) => {
        evt.preventDefault();
        const values = popupProfile._getInputValues();
        userInfo.setUserInfo(values.nameValue, values.descriptionValue);
        popupProfile.close();
    }}, popupProfileSelector);
    popupProfile.setEventListeners();
    
    //Создаем экземпляр добавления карточки
    const elementPopup = new PopupWithForm ({submit: (evt) => {
        evt.preventDefault();
        elementPopup._getInputValues();
            const cardData = {
                name: `${elementPopup._getInputValues().nameValue}`,
                link: `${elementPopup._getInputValues().descriptionValue}`,
            }

            const card = new Card(cardData, cardTemplateSelector, handleCardClick)
            const cardElement = card.generateCard();
            cardList.addItem(cardElement)

            elementPopup.popupElementName.value = '';
            elementPopup.popupElementLink.value = '';
        elementPopup.close();
    }}, elementPopupSelector);
    elementPopup.setEventListeners();
    
    //Создаем экземпляр попапа с картинкой
    const popupImage = new PopupWithImage(popupCardSelector);
    popupImage.setEventListeners();

// ДОМ элементы
const profileEditBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const profileAddButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточки
const formList = Array.from(document.querySelectorAll('.popup__submit-form')); //Массив форм

//Упрощаем валидацию. В первый раз задаем значения профиля до открытия попапа
popupProfile.popupName.value = userInfo.getUserInfo().name;
popupProfile.popupDescription.value = userInfo.getUserInfo().description;

// Вызов попапа редактирвоание профиля
profileEditBtn.addEventListener('click', ()=>{
    popupProfile.popupName.value = userInfo.getUserInfo().name;
    popupProfile.popupDescription.value = userInfo.getUserInfo().description;
    popupProfile.open();

});

//Вызов попапа редактирования карточки
profileAddButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    elementPopup.open()
});

function handleCardClick(name, link){
    popupImage.open(name, link);
}

//Включаем валидацию для каждой формы
formList.forEach((formItem)=>{
    const formValidator = new FormValidator (selectorsObject, formItem);
    formValidator.enableValidation();
})

cardList.renderItems();