process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");
let item = { name: "test", price: 200 };
beforeEach(async () => {
	items.push(item);
});

afterEach(async () => {
	items = [];
});

describe("GET /items", async () => {
	test("get list of items", async () => {
		const response = await request(app).get(`/items`);
		const { items } = response.body;
		expect(response.statusCode).toBe(200);
		expect(items).toHaveLength(1);
	});
});

describe("GET /items/:name", async () => {
	test("get an item", async () => {
		const response = await request(app).get(`/items/${item.name}`);
		expect(response.statusCode).toBe(200);
		expect(response.body.item).toEqual(item);
	});

	test("respond with 404 if no item", async () => {
		const response = await request(app).get(`/items/0`);
		expect(response.statusCode).toBe(404);
	});
});

describe("POST /items", async () => {
	test("post an item", async () => {
		const response = await request(app).post(`/items`).send({
			name: "test1",
			price: 700,
		});
		expect(response.statusCode).toBe(200);
		expect(response.body.item).toHaveProperty("name");
		expect(response.body.item).toHaveProperty("price");
		expect(response.body.item.name).toEqual("test1");
		expect(response.body.item.price).toEqual(700);
	});
});

describe("PATCH /items/:name", async () => {
	test("patch an item", async () => {
		const response = await request(app).patch(`/items/${item.name}`).send({
			name: "nonexistent",
		});
		expect(response.statusCode).toBe(200);
		expect(response.body.item).toEqual({
			name: "nonexistent",
		});
	});

	test("respond with 404 if no item", async () => {
		const response = await request(app).patch(`/items/0`);
		expect(response.statusCode).toBe(404);
	});
});

describe("DELETE /items/:name", async () => {
	test("delete an item", async () => {
		const response = await request(app).delete(`/items/${item.name}`);
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ message: "Deleted" });
	});
});
