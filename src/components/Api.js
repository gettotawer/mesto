export class Api{
    constructor({baseUrl, headers}){
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    getUserInfo(){
       return fetch(`${this._baseUrl}/users/me`,{
        headers: this._headers})
        .then((res)=>{
            if(res.ok){
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).catch((err)=>{
            console.log(err)
        })
    }

    getCardsArray(){
        return fetch(`${this._baseUrl}/cards`,{
            headers: this._headers})
            .then((res)=>{
                if(res.ok){
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }).catch((err)=>{
                console.log(err)
            })
    }

    editProfile(newName, newAbout){
        return fetch(`${this._baseUrl}/users/me`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${newName}`,
                about: `${newAbout}`,
            })
        }).then((res)=>{
                if(res.ok){
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }).catch((err)=>{
                console.log(err)
            })
    }

    addCard(cardName, cardLink){
        return fetch(`${this._baseUrl}/cards`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: `${cardName}`,
                link: `${cardLink}`,
            })
        }).then((res)=>{
                if(res.ok){
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }).catch((err)=>{
                console.log(err)
            })
    }

    deleteCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}`,{
            method: 'DELETE',
            headers: this._headers
        }).then((res)=>{
                if(res.ok){
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }).catch((err)=>{
                console.log(err)
            })
    }

    likeCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
            method: 'PUT',
            headers: this._headers
        }).then((res)=>{
                if(res.ok){
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }).catch((err)=>{
                console.log(err)
            })
    }

    dislikeCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
            method: 'DELETE',
            headers: this._headers
        }).then((res)=>{
                if(res.ok){
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }).catch((err)=>{
                console.log(err)
            })
    }

    setNewAvatar(avatarLink){
        return fetch(`${this._baseUrl}/users/me/avatar/`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: `${avatarLink}`,
            })
        }).then((res)=>{
                if(res.ok){
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            }).catch((err)=>{
                console.log(err)
            })
    }
}