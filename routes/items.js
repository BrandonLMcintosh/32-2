const Item = require("../item");
const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
	try {
		return res.json({ items: Item.list() });
	} catch (err) {
		return next(err);
	}
});

router.post("", (req, res, next) => {
	try {
		let newItem = new Item(req.body.name, req.body.price);
		return res.json({ item: newItem });
	} catch (err) {
		return next(err);
	}
});

router.get("/:name", (req, res, next) => {
	try {
		const item = Item.get(req.params.name);
		return res.json({ item: item });
	} catch (err) {
		return next(err);
	}
});

router.patch("/:name", (req, res, next) => {
	try {
		const item = Item.get(req.params.name);
	} catch (err) {
		console.log(err);
		return next(err);
	}
});

router.delete("/:name", (req, res, next) => {
	try {
		const item = Item.get(req.params.name);
		item.delete();
		return res.json({ message: "Deleted" });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
