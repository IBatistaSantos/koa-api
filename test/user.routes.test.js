const { PrismaClient } = require("@prisma/client")


const request = require('supertest');
const app = require('../src/app');

describe("User Routes", () => {

  test("POST create user", async () => {
    const payload = {
      "name": "John",
      "email": "john@example.com",
      "password": "password"
    }

    const { body, status } = await request(app.callback()).post('/users').send(payload);
    expect(status).toBe(200);
    expect(body.data.name).toBe("John");
  });

  test("POST failed created user with email exists", async () => {
    const payload = {
      "name": "John",
      "email": "john@example.com",
      "password": "password"
    }

     await request(app.callback()).post('/users').send(payload);

    const { body, status } = await request(app.callback()).post('/users').send(payload);
    expect(status).toBe(400);
    expect(body).toHaveProperty("error")
  });



})

