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
		const existing = items.find((item) => item.name === name);
		if (existing === undefined) throw { message: "Item not found", status: 404 };
		return existing;
	}

	patch(data) {
		this.name = data.name;
		this.price = data.price;
	}

	delete() {
		const index = items.findIndex((item) => item.name === this.name);
		if (index === -1) throw { message: "Not Found", status: 404 };
		items.splice(index, 1);
	}
}

module.exports = Item;
