import { db } from "../../database";
import { ResourceNotFoundError } from "../../exceptions/ResourceNotFoundError";
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
  let queryParams: any = {
    where: {
      deletedOn: null,
    },
  };

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
  return db.book.findFirst({
    where: {
      id: bookId,
      deletedOn: null,
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

export const updateBookById = async (
  bookId: number,
  {
    title,
    description,
    authorId,
    price,
    coverImage,
  }: Pick<Book, "title" | "description" | "authorId" | "price" | "coverImage">
) => {
  const updatedBooks = await db.book.updateMany({
    where: {
      id: bookId,
      authorId: authorId,
      deletedOn: null,
    },
    data: {
      title,
      description,
      authorId,
      price,
      coverImage,
    },
  });

  if (updatedBooks.count > 0) {
    return db.book.findFirst({
      where: {
        id: bookId,
      },
    });
  }

  throw new ResourceNotFoundError("Requested book not found");
};

export const publishBookById = async (bookId: number, authorId: number) => {
  const updatedBooks = await db.book.updateMany({
    where: {
      id: bookId,
      authorId: authorId,
      deletedOn: null,
    },
    data: {
      publishedOn: new Date(),
    },
  });

  if (updatedBooks.count > 0) {
    return db.book.findFirst({
      where: {
        id: bookId,
      },
    });
  }

  throw new ResourceNotFoundError("Requested book not found");
};

export const unpublishBookById = async (bookId: number, authorId: number) => {
  const updatedBooks = await db.book.updateMany({
    where: {
      id: bookId,
      authorId: authorId,
      deletedOn: null,
    },
    data: {
      publishedOn: null,
    },
  });

  if (updatedBooks.count > 0) {
    return db.book.findFirst({
      where: {
        id: bookId,
      },
    });
  }

  throw new ResourceNotFoundError("Requested book not found");
};

export const deleteBookById = async (bookId: number, authorId: number) => {
  const updatedBooks = await db.book.updateMany({
    where: {
      id: bookId,
      authorId: authorId,
      deletedOn: null,
    },
    data: {
      deletedOn: new Date(),
    },
  });

  if (updatedBooks.count > 0) {
    return db.book.findFirst({
      where: {
        id: bookId,
      },
    });
  }

  throw new ResourceNotFoundError("Requested book not found");
};
