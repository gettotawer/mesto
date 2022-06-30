export class Section {
    constructor({render}, containerSelector){
        this.render = render;
        this._containerSection = document.querySelector(containerSelector);
    }

    renderItems(items){
        items.forEach((item) => {
            this.render(item);
        });
    }

    addServerItem(item){
        this._containerSection.append(item)
    }

    addNewItem(item){
        this._containerSection.prepend(item)
    }
}