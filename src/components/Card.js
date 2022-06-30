export class Card{
    constructor(cardsData, cardTemplateSelector, handleCardClick, handleDeleteCardClick, handleLikeClick, handleDislikeClick){
        this._name = cardsData.name;
        this._link = cardsData.link;
        this._ownerId = cardsData.owner._id;
        this._cardId = cardsData._id;
        this._likeAmmount = cardsData.likes;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._myId = '60b750b65d30829181392346';
        this._handleLikeClick = handleLikeClick;
        this._handleDislikeClick = handleDislikeClick;
    }

    _getTemplate(){
        const cardElement = document.querySelector(this._cardTemplateSelector).content.querySelector('.element').cloneNode(true);
        return cardElement
    }

    // handleDeleteCard(event){
    //     event.target.closest('.element').remove()
    // }

    _handleLikeCard(event){
        event.target.classList.toggle('element__like-button_active')
    }

    generateCard(){
        this._element = this._getTemplate();

        this._elementTitle = this._element.querySelector('.element__title');
        this._elementImage = this._element.querySelector('.element__image');
        this._elementDeleteButton = this._element.querySelector('.element__delete-button');
        this._elementLikeButton = this._element.querySelector('.element__like-button');
        this._elementLikeAmmount = this._element.querySelector('.element__like-ammount');
        if(this._myId != this._ownerId){
            this._elementDeleteButton.style.display = 'none'; 
        }

        this._elementLikeAmmount.textContent = this._likeAmmount.length;
        if(this._likeAmmount.some((item)=>{
            return item._id == this._myId;
        })){
            this._elementLikeButton.classList.add('element__like-button_active');
        }
        this._elementTitle.textContent = this._name;
        this._elementImage.setAttribute('src', this._link);
        this._elementImage.setAttribute('alt', this._name);
        // Навешиваем слушатели на элементы карточки
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners(){
        this._elementLikeButton.addEventListener('click', (evt)=>{
            this._handleLikeCard(evt)
            if(evt.target.classList.contains('element__like-button_active')){
                this._handleLikeClick(this._cardId).then((data) => {
                    this._elementLikeAmmount.textContent = data.likes.length;
                })
            } else {
                this._handleDislikeClick(this._cardId).then((data) => {
                    this._elementLikeAmmount.textContent = data.likes.length;
                });
            }
        });
        this._elementDeleteButton.addEventListener('click',(evt) => {
            this._handleDeleteCardClick(evt, this._cardId);
        });
        this._elementImage.addEventListener('click', ()=>{
            this._handleCardClick(this._name, this._link);
        });
    }

}