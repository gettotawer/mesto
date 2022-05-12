// Массив карточек
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
// ДОМ элементы
const templateElement = document.querySelector('#template-element').content.querySelector('.element');
const elementsContainer = document.querySelector('.elements'); // Контейнер элементов
const profileEditBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const popupProfileCloseBtn = document.querySelector('.popup-profile__close-button'); // Кнопка закрытия попапа редактирования профиля
const popupElementCloseBtn = document.querySelector('.popup-element__close-button'); // Кнопка закрытия попапа добавления карточки
const popupProfile = document.querySelector('.popup-profile'); // Попап редактирования профиля
const popupElement = document.querySelector('.popup-element'); //Попап добавления карточки
const profileName = document.querySelector('.profile__name'); //Имя профиля
const profileDescription = document.querySelector('.profile__description'); //Описание профиля
const popupName = document.querySelector('.popup-profile__form_el_name'); //Окно редактирования имени профиля
const popupDescription = document.querySelector('.popup-profile__form_el_description'); //Окно редактирования описания профиля
const popupProfileSubmitBtn = document.querySelector('.popup-profile__submit-button'); //Кнопка сохранения изменений профиля
const profileAddButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточки
const popupElementSubmitButton = document.querySelector('.popup-element__submit-button') //Кнопка сохранения карточки
const popupElementName = document.querySelector('.popup-element__form_el_name'); //Название карточки
const popupElementLink = document.querySelector('.popup-element__form_el_link'); // Ссылка на изображение для карточки
const popupCard = document.querySelector('.popup-card'); // Попап карточки с картинкой
const popupImage = document.querySelector('.popup-card__image');
const popupSubtitle = document.querySelector('.popup-card__subtitle');
const popupCardCloseButton = document.querySelector('.popup-card__close-button');
const profileForm = document.querySelector('.popup-profile__form');
const elementForm = document.querySelector('.popup-element__form')


// Функция изменения профиля
function profileChangeSubmit (evt){
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    closePopup(popupProfile);
}

//Показывает попап редактирвоания профиля / добавления карточки
function openPopup (popup) {
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
        if(popupProfile.classList.contains('popup_opened')){
            closePopup(popupProfile);
        } else if(popupCard.classList.contains('popup_opened')){
            closePopup(popupCard);
        } else {
            closePopup(popupElement);
        }
    }
}

//Генерация карточки
function generateElementCard(cardsData){
    const newElementCard = templateElement.cloneNode(true);

    const elementCardTitle = newElementCard.querySelector('.element__title');
    const elementCardImage = newElementCard.querySelector('.element__image');
    elementCardTitle.textContent = cardsData.name;
    elementCardImage.setAttribute('src', cardsData.link);
    elementCardImage.setAttribute('alt', cardsData.name);

    const elementDeleteButton = newElementCard.querySelector('.element__delete-button'); //Кнопка удаления карточки
    elementDeleteButton.addEventListener('click', handleDeleteElementCard);
    
    const likeButton = newElementCard.querySelector('.element__like')//Кнопка лайка
    likeButton.addEventListener('click', handleLikeCard);

    elementCardImage.addEventListener('click', () => handlePopupImage(cardsData))

    return newElementCard;
}

function handlePopupImage(cardsData){
    openPopup(popupCard);
    popupSubtitle.textContent = cardsData.name;
    popupImage.setAttribute('src', cardsData.link);
    popupImage.setAttribute('alt', cardsData.name);
}

//Рендер карточек
function renderElementCard(cardsData){
    elementsContainer.prepend(generateElementCard(cardsData))
};

initialCards.forEach((cardsData) =>{
    renderElementCard(cardsData);
})

//Добавление новой карточки
function handleSubmitAddElementForm(evt){
    evt.preventDefault();
    const newCard = {
        name: `${popupElementName.value}`,
        link: `${popupElementLink.value}`,
    }
    renderElementCard(newCard);
    closePopup(popupElement);
    popupElementName.value = '';
    popupElementLink.value = '';
}

function hidePopupImage(){
    popupCard.classList.toggle('popup-card_opened')
}

popupCardCloseButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closePopup(popupCard);
})

//Удаление карточки
function handleDeleteElementCard(event){
    event.target.closest('.element').remove()
}

//Лайк карточки
function handleLikeCard(event){
    event.target.classList.toggle('element__like_active')
}

popupName.value = profileName.textContent;
popupDescription.value = profileDescription.textContent;

// Вызов попапа редактирвоание профиля
profileEditBtn.addEventListener('click', ()=>{
    openPopup(popupProfile);
});
// Закрытие попапа редактирования профиля
popupProfileCloseBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    closePopup(popupProfile);
});
// Редактирование профиля
profileForm.addEventListener('submit', function(event){
    profileChangeSubmit(event);
});

//Добавление карточки
profileAddButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopup(popupElement);
});
popupElementCloseBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    closePopup(popupElement);
});

elementForm.addEventListener('submit', function(event){
    handleSubmitAddElementForm(event);
});