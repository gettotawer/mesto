import '../pages/index.css';

//Импортируем классы
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { popupDeleteCard } from "../components/PopupDeleteCard.js";



let myId;




//Селекторы
const cardTemplateSelector = '#template-element';
const containerSelector = '.elements';
const profileNameSelector = '.profile__name';
const profileDescriptionSelector = '.profile__description';
const popupCardSelector = '.popup-card';
const elementPopupSelector = '.popup-element';
const popupProfileSelector = '.popup-profile';
const popupDeleteCardSelector = '.popup-delete-card';
const popupAvatarChangeSelector = '.popup-avatar';
const selectorsObject = {
    inputSelector: '.popup__form',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input-container_invalid',
}




function createCard(cardItem, cardTemplateSelector, handleCardClick, handleDeleteCardClick, handleLikeClick, handleDislikeClick, myId){
    const card = new Card(cardItem, cardTemplateSelector, handleCardClick, handleDeleteCardClick, handleLikeClick, handleDislikeClick, myId);
    return card.generateCard()
}



//Создаем необходимые классы
const userInfo = new UserInfo (profileNameSelector, profileDescriptionSelector);




//Создаем экземпляр редактирования профиля   
const popupProfile = new PopupWithForm({submit: (formValues) => {
    popupProfile.waiting(true)
    api.editProfile(formValues.profileName,formValues.profileDescription).then((data)=>{
            userInfo.setUserInfo(data.name, data.about);
            popupProfile.close();
        }).finally(()=>{
            popupProfile.waiting(false)
        }).catch((err)=>{
            console.log(err)
        })
}}, popupProfileSelector);
popupProfile.setEventListeners();




    //Создаем экземпляр добавления карточки
const elementPopup = new PopupWithForm ({submit: (formValues) => {
    // const cardData = {
    //     name: `${formValues.cardName}`,
    //     link: `${formValues.cardDescription}`,
    // }
    elementPopup.waiting(true)
    api.addCard(formValues.cardName, formValues.cardDescription).then((data)=>{
        const card = createCard(data, cardTemplateSelector, handleCardClick, handleDeleteCardClick, handleLikeClick, handleDislikeClick, myId);
        cardList.addNewItem(card);
        elementPopup.close();
    }).finally(()=>{
        elementPopup.waiting(false)
    }).catch((err)=>{
        console.log(err)
    });
}}, elementPopupSelector);
elementPopup.setEventListeners();



const deleteCardPopup = new popupDeleteCard({deleteCard: (cardId) => {
    deleteCardPopup.waiting(true)
    api.deleteCard(cardId).then(() => {
        deleteCardPopup.close();
    }).finally(()=>{
        deleteCardPopup.waiting(false)
    }).catch((err)=>{
        console.log(err)
    });;
}}, popupDeleteCardSelector)
deleteCardPopup.setEventListeners()





//Создаем экземпляр попапа с картинкой
const popupImage = new PopupWithImage(popupCardSelector);
popupImage.setEventListeners();




//Попап изменения автара профиля
const profileAvatarPopup = new PopupWithForm({submit: (formValues) => {
    profileAvatarPopup.waiting(true);
    api.setNewAvatar(formValues.cardDescription).then((data) => {
        userInfo.setUserAvatar(data.avatar);
        profileAvatarPopup.close();
    }).finally(()=>{
        profileAvatarPopup.waiting(false);
    }).catch((err)=>{
        console.log(err)
    });
}}, popupAvatarChangeSelector);
profileAvatarPopup.setEventListeners();




//Создаем экземпляр класса вставки в разметку
const cardList = new Section({
    render: (cardItem) => {
        const card = createCard(cardItem, cardTemplateSelector, handleCardClick, handleDeleteCardClick, handleLikeClick, handleDislikeClick, myId)
        cardList.addServerItem(card)
}}, containerSelector)



//Создаем экземпляр класса API
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
    headers: {
        authorization: 'caa86cf1-6fb2-4a80-af1c-177822ac6f9b',
        'Content-Type': 'application/json'
    }
});
  



Promise.all([api.getUserInfo(),api.getCardsArray()]).then(([userData, cards]) => {
    console.log(userData, cards);
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    myId = userData._id;
    cardList.renderItems(cards);
}).catch((err)=>{
    console.log(err)
});




// Функция изменения данных профиля
// function changeProfileInfo(){
//     api.getUserInfo().then((data)=>{
//         userInfo.setUserInfo(data.name, data.about, data.avatar);
//     }).catch((err)=>{
//         console.log(err)
//     });
// }
//Вызываем функцию
// changeProfileInfo()


//получаем массив карточек с сервера и рендерим их
// api.getCardsArray().then((data)=>{
//     cardList.renderItems(data);
// }).catch((err)=>{
//     console.log(err)
// });





// ДОМ элементы
const profileEditBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const profileAddButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточки
const popupProfileFormElement = document.querySelector('.popup-profile__form');
const popupElementFormElement = document.querySelector('.popup-element__form');
const popupAvatarFormElement = document.querySelector('.popup-avatar__form');
const popupName = document.querySelector('.popup-profile__form_el_name'); //Окно редактирования имени профиля 
const popupDescription = document.querySelector('.popup-profile__form_el_description'); //Окно редактирования описания профиля
const avatarButton = document.querySelector('.profile__avatar'); //Аватар профиля




// Вызов попапа редактирвоание профиля
profileEditBtn.addEventListener('click', ()=>{
    const userInfoObj = userInfo.getUserInfo()
    popupName.value = userInfoObj.name; 
    popupDescription.value = userInfoObj.description;
    profileValidation.toggleButtonState();
    popupProfile.open();
});




//Вызов попапа редактирования карточки
profileAddButton.addEventListener('click', () => {
    newCardValidation.toggleButtonState();
    elementPopup.open()
});




avatarButton.addEventListener('click', () => {
    avatarValidation.toggleButtonState()
    profileAvatarPopup.open();
})




//Функция обработки клика на карточку
function handleCardClick(name, link){
    popupImage.open(name, link);
}



//Функция обработки нажатия на иконку удаления карточки
function handleDeleteCardClick(evt, cardId){
    deleteCardPopup.open(evt, cardId)
}




//Функция лайка карточки
function handleLikeClick(cardId){
    return api.likeCard(cardId);
}



//Функция дизлайка карточки
function handleDislikeClick(cardId){
    return api.dislikeCard(cardId);
}



//Включаем валидацию для каждой формы
const profileValidation = new FormValidator (selectorsObject, popupProfileFormElement);
const newCardValidation = new FormValidator (selectorsObject, popupElementFormElement);
const avatarValidation = new FormValidator (selectorsObject, popupAvatarFormElement);
avatarValidation.enableValidation();
newCardValidation.enableValidation();
profileValidation.enableValidation();