import jsonwebtoken from "jsonwebtoken";
import { User } from "../authors/authors.controller";

export const issueAccessToken = (user: Pick<User, "id">): string => {
  const userId = user.id;

  const expiresIn = "1d";

  const payload = {
    id: userId,
  };

  const secret: string = process.env.JWT_SECRET || "";
  const signedToken = jsonwebtoken.sign(payload, secret, {
    expiresIn: expiresIn,
  });

  return signedToken;
};
