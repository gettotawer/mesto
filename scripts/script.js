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
const editBtn = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
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


// Функция изменения имени профиля
function changeName (evt){
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    popupProfileToggle()
}

//Скрывает или показывает попап редактирвоания профиля
function popupProfileToggle() {
    popupProfile.classList.toggle('popup_opened')
}

// Закрывает попап, если был сделан клин вне окна редактирования профиля
function popupProfileOverlayClick(evt) {
    if (evt.target === evt.currentTarget){
        popupProfile.classList.toggle('popup_opened')  
    }
}

//Скрывает или показывает попап добавления карточки
function popupElementToggle() {
    popupElement.classList.toggle('popup_opened')
}

// Закрывает попап, если был сделан клин вне окна добавления карточки
function popupElementOverlayClick(evt) {
    if (evt.target === evt.currentTarget){
        popupElement.classList.toggle('popup_opened')  
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

    elementCardImage.addEventListener('click', handlePopupImage)

    function handlePopupImage(evt){
        popupCard.classList.toggle('popup-card_opened');
        popupSubtitle.textContent = evt.target.getAttribute('Alt');
        popupImage.setAttribute('src', evt.target.getAttribute('src'));
        popupImage.setAttribute('alt', evt.target.getAttribute('alt'));
        console.log(evt.target.getAttribute('src'));
    }

    return newElementCard;
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
    popupElementToggle();
    popupElementName.value = '';
    popupElementLink.value = '';
}

function hidePopupImage(){
    popupCard.classList.toggle('popup-card_opened')
}

popupCardCloseButton.addEventListener('click', hidePopupImage)

//Удаление карточки
function handleDeleteElementCard(event){
    event.target.closest('.element').remove()
}

//Лайк карточки
function handleLikeCard(event){
    event.target.closest('.element__like').classList.toggle('element__like_active')
}


// Редактирвоание профиля
editBtn.addEventListener('click', ()=>{
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
    popupProfileToggle();
});
popupProfileCloseBtn.addEventListener('click', popupProfileToggle);
popupProfile.addEventListener('click', popupProfileOverlayClick);
popupProfileSubmitBtn.addEventListener('click', changeName);

//Добавление карточки
profileAddButton.addEventListener('click', popupElementToggle);
popupElementCloseBtn.addEventListener('click', popupElementToggle);
popupElement.addEventListener('click', popupElementOverlayClick);
popupElementSubmitButton.addEventListener('click', handleSubmitAddElementForm)
