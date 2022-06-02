import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// ДОМ элементы
const cardTemplateSelector = '#template-element';
const elementsContainer = document.querySelector('.elements'); // Контейнер элементов
const profileEditBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const popupCloseBtns = document.querySelectorAll('.popup__close-button'); // Кнопка закрытия попапа добавления карточки
const popupProfile = document.querySelector('.popup-profile'); // Попап редактирования профиля
const popupElement = document.querySelector('.popup-element'); //Попап добавления карточки
const profileName = document.querySelector('.profile__name'); //Имя профиля
const profileDescription = document.querySelector('.profile__description'); //Описание профиля
const popupName = document.querySelector('.popup-profile__form_el_name'); //Окно редактирования имени профиля
const popupDescription = document.querySelector('.popup-profile__form_el_description'); //Окно редактирования описания профиля
const profileAddButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточки
const popupElementName = document.querySelector('.popup-element__form_el_name'); //Название карточки
const popupElementLink = document.querySelector('.popup-element__form_el_link'); // Ссылка на изображение для карточки
const popupCard = document.querySelector('.popup-card'); // Попап карточки с картинкой
const profileForm = document.querySelector('.popup-profile__form');
const elementForm = document.querySelector('.popup-element__form');
const formList = Array.from(document.querySelectorAll('.popup__submit-form')); //Массив форм



// Функция изменения профиля
function handleProfileFormSubmit (evt){
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup();
}

//Показывает попап
export function openPopup (popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupOverlay)
    document.addEventListener('keydown', closePopupEsc)
 }

 //Скрывает попап
 function closePopup () {
    const openedPopup = document.querySelector('.popup_opened');
    openedPopup.classList.remove('popup_opened');
    openedPopup.removeEventListener('click', closePopupOverlay)
    document.removeEventListener('keydown', closePopupEsc)
 }

// Закрывает попап, если был сделан клин вне окна редактирования профиля
function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget){
        //closePopup(evt.target);
        closePopup();
    }
}

//Закрытие попапа, если была нажата кнопка esc
function closePopupEsc(evt){
    if(evt.key === 'Escape'){
        //const openedPopup = document.querySelector('.popup_opened');
        //closePopup(openedPopup);
        closePopup();
    }
}


function handleCardClick(name, link){
    this._popupCardSubtitle.textContent = name;
    this._popupCardImage.setAttribute('src', link);
    this._popupCardImage.setAttribute('alt', name);
    openPopup (document.querySelector('.popup-card'))
}

//Добавление новой карточки
function handleSubmitAddElementForm(evt){
    evt.preventDefault();
    const cardData = {
        name: `${popupElementName.value}`,
        link: `${popupElementLink.value}`,
    }
    elementsContainer.prepend(createCard(cardData, cardTemplateSelector))
    closePopup();
    popupElementName.value = '';
    popupElementLink.value = '';
}


// Навешиваем прослушку события на каждую кнопку закрытия попапа
popupCloseBtns.forEach((btn)=>{
    btn.addEventListener('click', (evt) => {
        evt.preventDefault();
        closePopup();
    })
})

//Упрощаем валидацию. В первый раз задаем значения профиля до открытия попапа
popupName.value = profileName.textContent;
popupDescription.value = profileDescription.textContent;

// Вызов попапа редактирвоание профиля
profileEditBtn.addEventListener('click', ()=>{
    openPopup(popupProfile);
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
});

// Субмит формы профиля
profileForm.addEventListener('submit', function(event){
    handleProfileFormSubmit(event);
});

//Добавление карточки
profileAddButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopup(popupElement);
});


//Субмит попапа
elementForm.addEventListener('submit', function(event){
    handleSubmitAddElementForm(event);
});


//Функция создания элемента карточки
function createCard(item, cardTemplateSelector){
    const card = new Card(item, cardTemplateSelector, handleCardClick)
    const cardElement = card.generateCard();
    return cardElement
}

// Обходим массив с карточками
initialCards.forEach((cardsData) =>{
    elementsContainer.prepend(createCard(cardsData, cardTemplateSelector))
})

//объект селекторов
const selectorsObject = {
    inputSelector: '.popup__form',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input-container_invalid',
  }

//Включаем валидацию для каждой формы
formList.forEach((formItem)=>{
    const formValidator = new FormValidator (selectorsObject, formItem);
    formValidator.enableValidation();
})