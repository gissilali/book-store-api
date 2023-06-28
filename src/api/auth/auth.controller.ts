import bcrypt from "bcrypt";
import { db } from "../../database";
import { AuthenticationError } from "../../exceptions/AuthenticationError";
import { issueAccessToken } from "./auth.utils";
import { User } from "../authors/authors.controller";

export interface UserLoginResponse {
  user: Omit<User, "password">;
  access_token: string;
}

export const attemptLogin = async ({
  email,
  password,
}: Pick<User, "password" | "email">): Promise<UserLoginResponse> => {
  const user = await db.user.findFirst({
    where: { email },
  });

  if (user) {
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (passwordIsValid) {
      return {
        user: {
          id: user.id,
          name: user.name,
          pseudonym: user.pseudonym,
          email: user.email,
        },
        access_token: issueAccessToken(user),
      };
    } else {
      throw new AuthenticationError("Invalid credentials");
    }
  } else {
    throw new AuthenticationError("Invalid credentials");
  }
};
