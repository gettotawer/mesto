export class Popup{
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        const openedPopup = document.querySelector('.popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        openedPopup.addEventListener('click', this._closePopupOverlay)
    }

    close() {
        const openedPopup = document.querySelector('.popup_opened');
        openedPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        openedPopup.removeEventListener('click', this._closePopupOverlay)
    }

    _handleEscClose = (evt) => {
        if(evt.key === 'Escape'){
            this.close()
        }
    }

    _closePopupOverlay = (evt) => {
        if (evt.target === evt.currentTarget){
            this.close()
        } 
    }

    setEventListeners(){
        this._popup.querySelector('.popup__close-button').addEventListener('click', (evt) => {
            evt.preventDefault();
            this.close();
        })
           
    }
}