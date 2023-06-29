import bcrypt from "bcrypt";
import request from "supertest";
import app from "../../app";
import { refreshDB } from "../../../test/refresh.db";
import { db } from "../../database";

beforeEach(async () => {
  refreshDB();
});

describe("Authentication", () => {
  it("log in author successfully", async () => {
    await db.user.create({
      data: {
        name: "Sam Fisher",
        email: "sam@ubisoft.com",
        password: await bcrypt.hash("password", 10),
        pseudonym: "sam",
      },
    });
    const { body, statusCode } = await request(app).post("/auth/login").send({
      email: "sam@ubisoft.com",
      password: "password",
    });

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("access_token");
  });
});

afterEach(() => {
  refreshDB();
});
