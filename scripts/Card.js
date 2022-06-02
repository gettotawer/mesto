import { openPopup } from "./script.js";

export class Card{
    constructor(cardsData, cardTemplateSelector, handleCardClick){
        this._name = cardsData.name;
        this._link = cardsData.link;
        this._cardTemplateSelector = cardTemplateSelector;
        this._popupCardSubtitle = document.querySelector('.popup-card__subtitle');
        this._popupCardImage = document.querySelector('.popup-card__image');
        this._handleCardClick = handleCardClick;
    }

    _getTemplate(){
        const cardElement = document.querySelector(this._cardTemplateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement
    }

    _handleDeleteCard(event){
        event.target.closest('.element').remove()
    }

    _handleLikeCard(event){
        event.target.classList.toggle('element__like_active')
    }

    // _handlePopupImage(){
    //     openPopup(document.querySelector('.popup-card'));
    //     this._popupCardSubtitle.textContent = this._name;
    //     this._popupCardImage.setAttribute('src', this._link);
    //     this._popupCardImage.setAttribute('alt', this._name);
    // }

    generateCard(){
        this._element = this._getTemplate();

        this._elementTitle = this._element.querySelector('.element__title');
        this._elementImage = this._element.querySelector('.element__image');
        this._elementDeleteButton = this._element.querySelector('.element__delete-button');
        this._elementLike = this._element.querySelector('.element__like');

        this._elementTitle.textContent = this._name;
        this._elementImage.setAttribute('src', this._link);
        this._elementImage.setAttribute('alt', this._name);
        // Навешиваем слушатели на элементы карточки
        this._setEventListeners();
        // this._element.querySelector('.element__delete-button').addEventListener('click', this._handleDeleteCard); //Кнопка удаления карточки
        // this._element.querySelector('.element__like').addEventListener('click', this._handleLikeCard); //Кнопка лайка
        // this._element.querySelector('.element__image').addEventListener('click', () => this._setEventListeners()); //открывает попап
        //this._setEventListeners();
        return this._element;
    }

    _setEventListeners(){
        this._elementImage.setAttribute('src', this._link);
        this._elementImage.setAttribute('alt', this._name);
        this._elementLike.addEventListener('click', this._handleLikeCard);
        this._elementDeleteButton.addEventListener('click', this._handleDeleteCard);
        this._elementImage.addEventListener('click', ()=>{
            this._handleCardClick(this._name, this._link);
        });
        this._elementTitle.textContent = this._name;
    }

}