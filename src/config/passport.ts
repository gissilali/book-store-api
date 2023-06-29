import passport from "passport";
import passportJwt from "passport-jwt";
import { NextFunction, Request, Response } from "express";
import { db } from "../database";
import { AuthenticationError } from "../exceptions/AuthenticationError";
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    message: "Unauthenticated",
  });
};

export default function () {
  passport.use(
    new StrategyJwt(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      function (jwtPayload, done) {
        return db.user
          .findFirst({
            where: { id: jwtPayload.id },
            select: { id: true, pseudonym: true, name: true, email: true },
          })
          .then((user) => {
            if (user) {
              return done(null, user);
            }

            throw new AuthenticationError("Invalid credentials");
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );
}
