const editBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupName = document.querySelector('.popup__form_el_name');
const popupDescription = document.querySelector('.popup__form_el_description');
const popupSubmitBtn = document.querySelector('.popup__submit-button');


function changeName (evt){
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    popupToggle()
}

function popupToggle() {
    popup.classList.toggle('popup_opened')
}

function popupOverlayClick(evt) {
    if (evt.target === evt.currentTarget){
        popup.classList.toggle('popup_opened')  
    }
}


editBtn.addEventListener('click', ()=>{
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;
    popupToggle();
});
popupCloseBtn.addEventListener('click', popupToggle);
popup.addEventListener('click', popupOverlayClick)
popupSubmitBtn.addEventListener('click', changeName)