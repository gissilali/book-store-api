import request from "supertest";
import app from "../../app";
import * as sinon from "sinon";
import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";
describe("Books", () => {
  let token: string;
  const prismaClient = new PrismaClient();
  console.log({ prismaClient });
  beforeAll(async () => {
    prismaClient.user.findFirst = sinon.stub().resolves({
      id: 2,
      name: "Gibson Silali",
      pseudonym: "silali_",
      email: "kevinhart@mail.com",
      password: await bcrypt.hash("password", 10),
    });
    const response = await request(app).post("/auth/login").send({
      email: "kevinhart@mail.com",
      password: "password",
    });

    token = response.body.access_token;
  });
  it("can create books", (done) => {
    prismaClient.book.create = sinon.stub().resolves({
      title: "To Kill a Mocking Bird",
      description: "killing a mocking bird is sometimes fun",
      authorId: 2,
      author: {
        name: "Gibson Silali",
        pseudonym: "silali_",
        id: 2,
      },
    });

    request(app)
      .post("/books")
      .send({
        title: "To Kill a Mocking Bird",
        description: "killing a mocking bird is sometimes fun",
      })
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(201)
      .end(done);
  });
});
