const request = require("supertest");
const app = require("../db/index.js");
const jestSorted = require("jest-sorted");
const { mongoose } = require("mongoose");
const DB = require("../db/connection");
const ObjectId = require("mongoose").Types.ObjectId;

// beforeAll(async () => {
//   await connectDB(connStr);
// });

// afterAll(async () => {
//   await disconnectDB();
// });

describe("App", () => {
  describe("GET: /api/bikes", () => {
    it("returns an array of bike objects", () => {
      return request(app)
        .get("/api/bikes")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
          // expect(body.length).toBe(26);
        });
    });

    it("returns a 404 error when the endpoint does not exist but is a valid data type", () => {
      return request(app)
        .get("/api/bikees")
        .expect(404)
        .then(({ body }) => {
          console.log(body);
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
          console.log(body);
          expect(body).toMatchObject({
            bike_owner: expect.any(Array),
            type: expect.any(String),
            location: expect.any(Array),
            time_available: expect.any(String),
            price: expect.any(Number),
            description: expect.any(String),
            qr_url: expect.any(String),
            bike_image_url: expect.any(String),
            rented_by: expect.any(Array),
          });
        });
    });
    it("should return 201 when non-require fields are ommited from the post object", () => {
      const newBike = {
        bike_owner: "6422f0c6a34ba27daa40182c",
        type: "Mountain",
        location: ["2342", "35432"],
        time_available: "9am - 5pm",
        price: 200,
        qr_url: "random url",
        rented_by: "6422f0c6a34ba27daa40182c",
      };
      return request(app)
        .post("/api/bikes")
        .send(newBike)
        .expect(201)
        .then(({ body }) => {
          console.log(body);
          expect(body).toMatchObject({
            bike_owner: expect.any(Array),
            type: expect.any(String),
            location: expect.any(Array),
            time_available: expect.any(String),
            price: expect.any(Number),
            qr_url: expect.any(String),
            rented_by: expect.any(Array),
          });
        });
    });
    it("should return a 404 error when the endpoint does not exist but is a valid data type", () => {
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
        .post("/api/bikez")
        .send(newBike)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Path not found");
        });
    });
    it("should return a 400 error when a required field is empty", () => {
      const newBike = {
        price: 200,
        description: "THIS IS A VERY SPECIAL BIKE",
        qr_url: "random url",
        bike_image_url: "url random",
        rented_by: "6422f0c6a34ba27daa40182c",
      };
      return request(app)
        .post("/api/bikes")
        .send(newBike)
        .expect(400)
        .then(({ body }) => {
          console.log(body);
          expect(body.msg).toBe("Bad request");
        });
    });
  });

  describe("GET : /api/users", () => {
    it("should return a 200 status and an array of users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
          // expect(body.length).toBe(15);
        });
    });
    it("should return a 404 error when endpoint does not exists but is still a correct datatype", () => {
      return request(app)
        .get("/api/userz")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Path not found");
        });
    });
  });
  describe.skip("POST : api/users", () => {
    it("should return 201 status and a posted user", () => {
      const newUser = {
        username: "Johnny",
        email: "Johnyyyyy@gmail.com",
        password: "omgthisdismypassword123",
        credit_amount: 200,
        avatar_img_url: "a really cool image",
      };

      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .then(({ body }) => {
          expect(body).toMatchObject({
            username: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            credit_amount: expect.any(Number),
            avatar_img_url: expect.any(String),
          });
        });
    });
    it("should return a 201 when non-required fields are ommited", () => {
      const newUser = {
        username: "Haider",
        email: "Haiiiider@gmail.com",
        password: "lalalalala",
      };

      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .then(({ body }) => {
          expect(body).toMatchObject({
            username: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
          });
        });
    });
  });
  describe.only("GET : api/bikes/bike_id", () => {
    it("should return a 200 status and the correct bike containing the correct id", () => {
      return request(app)
        .get("/api/bikes/6424332c7cef0378c79859c3")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body[0])).toBe(false);
          expect(body[0]).toEqual({
            __v: 0,
            _id: "6424332c7cef0378c79859c3",
            bike_image_url: "url random",
            bike_owner: ["6422f0c6a34ba27daa40182c"],
            description: "nice bike its great",
            location: ["2342", "35432"],
            price: 200,
            qr_url: "random url",
            rented_by: ["6422f0c6a34ba27daa40182c"],
            time_available: "9am - 5pm",
          });
        });
    });
    it("should return a 404 error if the id does not exist", () => {
      return request(app)
        .get("/api/bikes/645520f1a301556a1e0c9fdf")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Path not found");
        });
    });
  });
});
