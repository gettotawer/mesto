export class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._closePopupOverlay)
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('mousedown', this._closePopupOverlay)
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
        this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        })  
    }
}