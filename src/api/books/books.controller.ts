import { db } from "../../database";
import { User } from "../authors/authors.controller";

export type Book = {
  id: number;
  title: string;
  description: string | null;
  publishedOn: Date | null;
  price: number;
  coverImage: string;
  authorId: number;
  author: Pick<User, "id" | "name" | "pseudonym">;
};

export const fetchBooks = () => {
  let queryParams: any = {};

  return db.book.findMany({
    ...queryParams,
    include: {
      author: {
        select: {
          name: true,
          pseudonym: true,
          id: true,
        },
      },
    },
  });
};

export const fetchBookById = (bookId: number) => {
  return db.book.findUniqueOrThrow({
    where: {
      id: bookId,
    },
    include: {
      author: {
        select: {
          name: true,
          pseudonym: true,
          id: true,
        },
      },
    },
  });
};

export const createBook = ({
  title,
  description,
  authorId,
  price,
  coverImage,
}: Pick<
  Book,
  "title" | "description" | "authorId" | "price" | "coverImage"
>) => {
  return db.book.create({
    data: {
      title,
      description,
      authorId,
      price,
      coverImage,
    },
    select: {
      title: true,
      description: true,
      authorId: true,
      price: true,
      coverImage: true,
      author: {
        select: {
          name: true,
          pseudonym: true,
          id: true,
        },
      },
    },
  });
};

export const updateBookById = (bookId: number, {}) => {};

export const publishBookById = (bookId: number) => {};

export const deleteBookById = (bookId: number) => {};
