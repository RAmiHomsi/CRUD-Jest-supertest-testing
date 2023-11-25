const mongoose = require("../../config/config");
const booksService = require("../../src/api/resources/books/books.service");
const bookModel = require("../../src/api/resources/books/books.model");

beforeEach(async () => {
  await bookModel.deleteMany({});
});
afterAll(async () => {
  await bookModel.deleteMany({});
  await mongoose.disconnect();
});

describe("getbooks", function () {
  it("return empty array", async function () {
    const books = await booksService.getBooks();
    expect(books.length).toBe(0);
  });

  it("return two books", async function () {
    await bookModel.insertMany([{ title: "book1" }, { title: "book2" }]);
    const books = await booksService.getBooks();
    expect(books.length).toBe(2);
    expect(books[0]).toMatchObject({ title: "book1" });
  });
});

describe("createBook", () => {
  it("create a react book", async () => {
    const react = await booksService.createBook({ title: "react" });
    const books = await bookModel.find({ react });
    expect(books.length).toBe(1);
    expect(books[0]).toMatchObject({ title: "react" });
  });
});
