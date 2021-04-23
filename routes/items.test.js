process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");
const item = { name: "junk", price: 600 };

beforeEach(async () => {
	items.push(item);
});

afterEach(async () => {
	items = [];
});

describe("get items", async () => {
	test("get list", async () => {
		const response = await request(app).get("/items");
		const { items } = response.body;
		expect(response.statusCode).toBe(200);
		expect(items).toHaveLength(1);
	});
});

describe("POST /items", async () => {
	test("create a new item", async () => {
		const response = await request(app).post("/items").send({
			name: "bottle",
			price: 2,
		});
		expect(response.statusCode).toBe(200);
		expect(response.body.item).toHaveProperty("name");
		expect(response.body.item.name).toEqual("bottle");
		expect(response.body.item.price).toEqual(2);
	});
});

describe("PATCH item", async () => {
	test("update a single item", async () => {
		const response = await request(app).patch(`/items/${item.name}`).send({ name: "fake" });
		expect(response.statusCode).toBe(200);
		expect(response.body.item).toEqual({
			name: "fake",
		});
	});
	test("respond with 404 if item not found", async () => {
		const response = await request(app).patch("/items/nothing");
		expect(response.statusCode).toBe(404);
	});
});

describe("delete item", async () => {
	test("delete a single item", async () => {
		const response = await request(app).delete(`/items/${item.name}`);
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ message: "Deleted" });
	});
});
