import request from "supertest";
import app from "../../app";
import { refreshDB } from "../../../test/refresh.db";

beforeEach(() => {
  refreshDB();
});

describe("Authors", () => {
  it("can register author", async () => {
    const userInput = {
      name: "Gibson Silali",
      email: "floyd@mayweather.com",
      password: "password",
      pseudonym: "silali_",
    };
    const { body, statusCode } = await request(app)
      .post("/authors")
      .send(userInput)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(statusCode).toBe(201);
    expect(body).toHaveProperty("email");
    expect(body.email).toBe(userInput.email);
  });
});

afterEach(() => {
  refreshDB();
});
