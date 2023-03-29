const request = require("supertest");
const app = require("../db/index.js");
const jestSorted = require("jest-sorted");
const { mongoose } = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const { connectDB, disconnectDB } = require("../connection.js");

const connStr =
  "mongodb+srv://thereactorsmcr:Northcoders123@cluster1.nhdvvfk.mongodb.net/test";

beforeAll(async () => {
  await connectDB(connStr);
});

afterAll(async () => {
  await disconnectDB();
});

describe("App", () => {
  describe("GET: /api/bikes", () => {
    it("returns an array of bike objects", () => {
      return request(app)
        .get("/api/bikes")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
          expect(body.length).toBe(16);
        });
    });

    it("returns a 404 error when the endpoint does not exist but is a valid data type", () => {
      return request(app)
        .get("/api/bikees")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Path not found");
        });
    });
  });

  describe("POST: /api/bikes", () => {
    it("should return a 201 status and a bike object", () => {
      const newBike = {
        bike_owner: "6422f0c6a34ba27daa40182c",
        type: "Mountain",
        location: ["2342", "35432"],
        time_available: "9am - 5pm",
        price: 200,
        description: "nice bike its great",
        qr_url: "random url",
        bike_image_url: "url random",
        rented_by: "6422f0c6a34ba27daa40182c",
      };
      return request(app)
        .post("/api/bikes")
        .send(newBike)
        .expect(201)
        .then(({ body }) => {
          expect(body).toMatchObject();
        });
    });
  });
});
