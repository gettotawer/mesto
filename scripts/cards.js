import { openPopup } from "./script.js";

export class Card{
    constructor(cardsData){
        this._name = cardsData.name;
        this._link = cardsData.link;
    }

    _getTemplate(){
        const cardElement = document.querySelector('#template-element').content.querySelector('.element').cloneNode(true);
        return cardElement
    }

    _handleDeleteCard(event){
        event.target.closest('.element').remove()
    }

    _handleLikeCard(event){
        event.target.classList.toggle('element__like_active')
    }

    _handlePopupImage(){
        openPopup(document.querySelector('.popup-card'));
        document.querySelector('.popup-card__subtitle').textContent = this._name;
        document.querySelector('.popup-card__image').setAttribute('src', this._link);
        document.querySelector('.popup-card__image').setAttribute('alt', this._name);
    }

    generateCard(cardsData){
        this._element = this._getTemplate();

        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').setAttribute('src', this._link);
        this._element.querySelector('.element__image').setAttribute('alt', this._name);
        // Навешиваем слушатели на элементы карточки
        this._element.querySelector('.element__delete-button').addEventListener('click', this._handleDeleteCard); //Кнопка удаления карточки
        this._element.querySelector('.element__like').addEventListener('click', this._handleLikeCard); //Кнопка лайка
        this._element.querySelector('.element__image').addEventListener('click', () => this._handlePopupImage()); //открывает попап

        return this._element;
    }

}