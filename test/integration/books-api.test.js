const request = require("supertest");
const mongoose = require("../../config/config");
const server = require("../../app");
const bookModel = require("../../src/api/resources/books/books.model");

afterEach(async () => {
  await bookModel.deleteMany({});
});

afterAll(async () => {
  server.close();
  await mongoose.disconnect();
});

describe("getBook", () => {
  it("return ok and get book from db", async () => {
    const book = await bookModel.create({ title: "Mybook" });
    const res = await request(server).get(`/api/books/${book.id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch("book retrieved successfully");
    expect(res.body.data.book).toMatchObject({ title: "Mybook" });
  });

  it("return 404 if not found", async () => {
    const res = await request(server).get(
      "/api/books/507f1f77bcf86cd799439011"
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch("not found");
  });

  it("return 500 if internal issues", async () => {
    const res = await request(server).get("/api/books/10");
    expect(res.status).toBe(500);
  });
});

describe("updateBook", () => {
  it("return 404 if not found", async () => {
    const res = await request(server).put(
      "/api/books/507f1f77bcf86cd799439011"
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch("not found");
  });

  it("return 200 and update a book", async () => {
    const book = await bookModel.create({ title: "Mybook" });
    const res = await request(server)
      .put(`/api/books/${book.id}`)
      .send({ title: "updated book" });
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch("book updated successfully");
    expect(res.body.data.book).toMatchObject({ title: "updated book" });
  });
});

describe("deleteBook", () => {
  it("return 200 and delete a book", async () => {
    const book = await bookModel.create({ title: "Mybook" });
    const res = await request(server).delete(`/api/books/${book.id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch("deleted successfully");
  });
});
