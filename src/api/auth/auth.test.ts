import bcrypt from "bcrypt";
import request from "supertest";
import app from "../../app";
import * as sinon from "sinon";
import { db as prismaClient } from "../../database";
import assert from "assert";

beforeAll(async () => {
  prismaClient.user.findFirst = sinon.stub().resolves({
    id: 1,
    name: "Gibson Silali",
    email: "harter@mail.com",
    pseudonym: "silali_",
    password: await bcrypt.hash("password", 10),
  });
});

describe("Authentication", () => {
  it("logs in author successfully", (done) => {
    request(app)
      .post("/auth/login")
      .send({
        email: "harter@mail.com",
        password: "password",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(function (res) {
        assert(res.body.hasOwnProperty("user"));
        assert(res.body.hasOwnProperty("access_token"));
      })
      .end(done);
  });
});
