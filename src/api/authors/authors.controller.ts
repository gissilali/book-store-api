import { db } from "../../database";
import bcrypt from "bcrypt";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  pseudonym: string | null;
};

export const createAuthor = async (
  author: Omit<User, "id">
): Promise<Omit<User, "password">> => {
  const { name, email, password, pseudonym } = author;
  return db.user.create({
    data: {
      name,
      email,
      password: await bcrypt.hash(password, 10),
      pseudonym,
    },
    select: {
      id: true,
      name: true,
      email: true,
      pseudonym: true,
    },
  });
};

export const getAuthors = async (): Promise<Omit<User, "password">[]> => {
  return db.user.findMany();
};
