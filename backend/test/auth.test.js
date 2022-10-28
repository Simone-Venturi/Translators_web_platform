const request = require("supertest");
const app = require("../app");

describe("Test the public path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/api/test/all")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the admin path without permission", () => {
  test("It should response 403 the GET method", done => {
    request(app)
      .get("/api/test/admin")
      .then(response => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });
});

describe("Test the translator path without permission", () => {
  test("It should response 403 the GET method", done => {
    request(app)
      .get("/api/test/translator")
      .then(response => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });
});

describe("Test the datascientist path without permission", () => {
  test("It should response 403 the GET method", done => {
    request(app)
      .get("/api/test/datascientist")
      .then(response => {
        expect(response.statusCode).toBe(403);
        done();
      });
  });
});