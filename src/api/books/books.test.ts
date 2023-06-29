import request from "supertest";
import app from "../../app";
import bcrypt from "bcrypt";
import { db as prismaClient } from "../../database";
import { refreshDB } from "../../../test/refresh.db";

let token: string;
let userId: number;

beforeEach(async () => {
    await refreshDB();
    const user = await prismaClient.user.create({
        data: {
            name: "Gibson Silali",
            pseudonym: "silali_",
            email: "kevinhart@mail.com",
            password: await bcrypt.hash("password", 10),
        },
    });
    userId = user.id;
    const response = await request(app).post("/auth/login").send({
        email: "kevinhart@mail.com",
        password: "password",
    });

    token = response.body.access_token;
});
describe("Books", () => {
    it("can add book", async () => {
        const { body, statusCode } = await request(app)
            .post("/books")
            .send({
                title: "To Kill a Mocking Bird",
                description: "killing a mocking bird is sometimes fun",
                price: 10,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            })
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`);

        expect(statusCode).toBe(201);
        expect(body.title).toBe("To Kill a Mocking Bird");
        expect(body.publishedOn).toBe(null);
    });

    it("can update book by Id", async () => {
        const book = await prismaClient.book.create({
            data: {
                authorId: userId,
                title: "To Kill a Mocking Bird",
                description: "killing a mocking bird is sometimes fun",
                price: 10,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            },
        });
        const { body, statusCode } = await request(app)
            .patch(`/books/${book.id}`)
            .send({
                title: "To Kill a Mocking Bird Pt 2.",
                description: "killing a mocking bird is sometimes fun",
                price: 12,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            })
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`);
        expect(statusCode).toBe(200);
        expect(body.title).toBe("To Kill a Mocking Bird Pt 2.");
        expect(body.price).toBe("12");
    });

    it("can publish book by Id", async () => {
        const book = await prismaClient.book.create({
            data: {
                authorId: userId,
                title: "To Kill a Mocking Bird",
                description: "killing a mocking bird is sometimes fun",
                price: 10,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            },
        });
        const { body, statusCode } = await request(app)
            .patch(`/books/${book.id}/publish`)
            .send({
                title: "To Kill a Mocking Bird Pt 2.",
                description: "killing a mocking bird is sometimes fun",
                price: 12,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            })
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`);
        expect(statusCode).toBe(200);
        expect(body.publishedOn).toBeTruthy();
    });

    it("can unpublish book by Id", async () => {
        const book = await prismaClient.book.create({
            data: {
                authorId: userId,
                title: "To Kill a Mocking Bird",
                description: "killing a mocking bird is sometimes fun",
                price: 10,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            },
        });
        const { body, statusCode } = await request(app)
            .patch(`/books/${book.id}/unpublish`)
            .send({
                title: "To Kill a Mocking Bird Pt 2.",
                description: "killing a mocking bird is sometimes fun",
                price: 12,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            })
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`);
        expect(statusCode).toBe(200);
        expect(body.publishedOn).toBeFalsy();
    });

    it("can delete book by Id", async () => {
        const book = await prismaClient.book.create({
            data: {
                authorId: userId,
                title: "To Kill a Mocking Bird",
                description: "killing a mocking bird is sometimes fun",
                price: 10,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            },
        });

        expect(book?.deletedOn).toBeFalsy();
        const { statusCode } = await request(app)
            .delete(`/books/${book.id}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`);

        expect(statusCode).toBe(204);

        const deletedBook = await prismaClient.book.findUnique({
            where: {
                id: book.id,
            },
        });

        expect(deletedBook?.deletedOn).toBeTruthy();
    });

    it("can fetch books", async () => {
        await prismaClient.book.create({
            data: {
                authorId: userId,
                title: "To Kill a Mocking Bird",
                description: "killing a mocking bird is sometimes fun",
                price: 10,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            },
        });
        await prismaClient.book.create({
            data: {
                authorId: userId,
                title: "Fledgling",
                description: "Octavia Butler's masterpiece",
                price: 10,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            },
        });
        await prismaClient.book.create({
            data: {
                authorId: userId,
                title: "Things Fall Apart",
                description: "Chinua Achebe's Magnum Opus",
                price: 10,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            },
        });

        const { body, statusCode } = await request(app).get('/books').set("Accept", "application/json");
        expect(statusCode).toBe(200);
        expect(body.length).toBe(3);
    });

    it("can filter by author", async () => {
        const secondUser = await prismaClient.user.create({
            data: {
                name: "Chinua Achebe",
                pseudonym: "achebe",
                email: "achebe@mail.com",
                password: await bcrypt.hash("password", 10),
            },
        });
        await prismaClient.book.create({
            data: {
                authorId: userId,
                title: "To Kill a Mocking Bird",
                description: "killing a mocking bird is sometimes fun",
                price: 10,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            },
        });
        await prismaClient.book.create({
            data: {
                authorId: userId,
                title: "Fledgling",
                description: "Octavia Butler's masterpiece",
                price: 10,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            },
        });
        await prismaClient.book.create({
            data: {
                authorId: secondUser.id,
                title: "Things Fall Apart",
                description: "Chinua Achebe's Magnum Opus",
                price: 10,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            },
        });

        const { body, statusCode } = await request(app).get('/books').query({
            authorId: secondUser.id
        }).set("Accept", "application/json");
        expect(statusCode).toBe(200);
        expect(body.length).toBe(1);
    });

    it("can filter by title", async () => {
        const secondUser = await prismaClient.user.create({
            data: {
                name: "Chinua Achebe",
                pseudonym: "achebe",
                email: "achebe@mail.com",
                password: await bcrypt.hash("password", 10),
            },
        });
        await prismaClient.book.create({
            data: {
                authorId: userId,
                title: "To Kill a Mocking Bird",
                description: "killing a mocking bird is sometimes fun",
                price: 10,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            },
        });
        await prismaClient.book.create({
            data: {
                authorId: userId,
                title: "Fledgling",
                description: "Octavia Butler's masterpiece",
                price: 10,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            },
        });
        await prismaClient.book.create({
            data: {
                authorId: secondUser.id,
                title: "Things Fall Apart",
                description: "Chinua Achebe's Magnum Opus",
                price: 10,
                coverImage:
                    "https://cdns-images.dzcdn.net/images/cover/1ab64f433d709c7b108733bffb504c76/264x264.jpg",
            },
        });

        const { body, statusCode } = await request(app).get('/books').query({
            title: "Kill"
        }).set("Accept", "application/json");
        expect(statusCode).toBe(200);
        expect(body.length).toBe(1);
    });
});

afterEach(() => {
    refreshDB();
});
