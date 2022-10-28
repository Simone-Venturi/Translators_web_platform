const request = require("supertest");
const app = require("../app");
const db = require("../src/db/models");

describe("Test basic paths", () => {
  
	afterAll(async () => {
		await db.mongoConnection.disconnect()
	});

	test("It should response the GET method", done => {
		request(app)
		.get("/api/test/all")
		.then(response => {
			expect(response.statusCode).toBe(200);
			done();
		});
	});

	test(" should response 403 the GET method", done => {
		request(app)
		.get("/api/test/admin")
		.then(response => {
			expect(response.statusCode).toBe(403);
			done();
		});
	});

	test("It should response 403 the GET method", done => {
		request(app)
		.get("/api/test/translator")
		.then(response => {
			expect(response.statusCode).toBe(403);
			done();
		});
	});

	test("It should response 403 the GET method", done => {
		request(app)
		.get("/api/test/datascientist")
		.then(response => {
			expect(response.statusCode).toBe(403);
			done();
		});
	});
});