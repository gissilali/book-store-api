import request from "supertest";
import app from "../../app";
import * as sinon from "sinon";
import { db as prismaClient } from "../../database";

describe("Authors", () => {
  it("registers author", (done) => {
    prismaClient.user.create = sinon.stub().resolves({
      id: 1,
      name: "Gibson Silali",
      email: "harter@mail.com",
      pseudonym: "silali_",
    });

    request(app)
      .post("/authors")
      .send({
        id: 1,
        name: "Gibson Silali",
        email: "harter@mail.com",
        password: "password",
        pseudonym: "silali_",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201, {
        id: 1,
        name: "Gibson Silali",
        email: "harter@mail.com",
        pseudonym: "silali_",
      })
      .end(done);
  });
});
