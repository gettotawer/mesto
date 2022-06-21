// import '../pages/index.css';

//Импортируем классы
import { initialCards } from "../utils/initialCards.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

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

  function createCard(cardItem, cardTemplateSelector, handleCardClick){
    const card = new Card(cardItem, cardTemplateSelector, handleCardClick);
    return card.generateCard()
  }

//Создаем необходимые классы
const userInfo = new UserInfo (profileNameSelector, profileDescriptionSelector);
//Создаем экземпляр класса вставки в разметку
const cardList = new Section({ items: initialCards,
    render: (cardItem) => {
        const card = createCard(cardItem, cardTemplateSelector, handleCardClick)
        cardList.addItem(card)
    }}, containerSelector)
    
    //Создаем экземпляр редактирования профиля   
    const popupProfile = new PopupWithForm({submit: (formValues) => {
        userInfo.setUserInfo(formValues.profileName, formValues.profileDescription);
        popupProfile.close();
    }}, popupProfileSelector);
    popupProfile.setEventListeners();
    
    //Создаем экземпляр добавления карточки
    const elementPopup = new PopupWithForm ({submit: (formValues) => {
        const cardData = {
            name: `${formValues.cardName}`,
            link: `${formValues.cardDescription}`,
        }

        const card = createCard(cardData, cardTemplateSelector, handleCardClick)
        cardList.addItem(card)

        elementPopup.close();
    }}, elementPopupSelector);
    elementPopup.setEventListeners();
    
    //Создаем экземпляр попапа с картинкой
    const popupImage = new PopupWithImage(popupCardSelector);
    popupImage.setEventListeners();

// ДОМ элементы
const profileEditBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const profileAddButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточки
const popupProfileFormElement = document.querySelector('.popup-profile__form');
const popupElementFormElement = document.querySelector('.popup-element__form');

// Вызов попапа редактирвоание профиля
profileEditBtn.addEventListener('click', ()=>{
    const userInfoObj = userInfo.getUserInfo()
    const objValues = {};
    popupProfile.popupInputs.forEach((input) => {
        objValues[input.name] = input;
    })
    objValues.profileName.value = userInfoObj.name;
    objValues.profileDescription.value = userInfoObj.description;
    profileValidation.toggleButtonState();
    popupProfile.open();

});

//Вызов попапа редактирования карточки
profileAddButton.addEventListener('click', () => {
    newCardValidation.toggleButtonState();
    elementPopup.open()
});

function handleCardClick(name, link){
    popupImage.open(name, link);
}

//Включаем валидацию для каждой формы

const profileValidation = new FormValidator (selectorsObject, popupProfileFormElement);
const newCardValidation = new FormValidator (selectorsObject, popupElementFormElement);
newCardValidation.enableValidation();
profileValidation.enableValidation();

cardList.renderItems();