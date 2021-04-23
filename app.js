const express = require("express");
const app = express();

const itemsRoute = require("./routes/items");
const AppError = require("./appError");

app.use(express.json());
app.use("/items", itemsRoute);

app.use((req, res, next) => {
	return new AppError("Not Found", 404);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);

	return res.json({
		error: err.message,
	});
});

module.exports = app;
