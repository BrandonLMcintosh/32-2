const items = require("./fakeDb");

class Item {
	constructor(name, price) {
		this.name = name;
		this.price = price;
		items.push(this);
	}

	static list() {
		return items;
    }

    static get(name) {
        const existing = items.find(item => item.name === name);
        if (existing === undefined) throw { message: "Item not found", status: 404 };
        return existing;
    }
    
    static update(name, data) {
        let existingItem = Item.
    }

    static remove(name)


}
