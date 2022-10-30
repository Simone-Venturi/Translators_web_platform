const request = require("supertest");
const app = require("../app");
const db = require("../src/db/models");
const { mongoTranslationsQueue, mongoTranslationAggregationQueue, postgresTranslationQueue } = require("../src/queues/translation.queue");

describe("Test basic paths", () => {
  
	afterAll(async () => {
		await db.mongoConnection.disconnect();
        await mongoTranslationsQueue.close();
        await postgresTranslationQueue.close();
        await mongoTranslationAggregationQueue.close();
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