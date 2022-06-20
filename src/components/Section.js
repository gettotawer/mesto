export class Section {
    constructor({items, render}, containerSelector){
        this._items = items;
        this.render = render;
        this._containerSection = document.querySelector(containerSelector);
    }

    renderItems(){
        this._items.forEach((item) => {
            this.render(item);
        });
    }

    addItem(item){
        this._containerSection.prepend(item)
    }
}