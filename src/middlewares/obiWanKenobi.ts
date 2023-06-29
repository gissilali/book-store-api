import { Request, Response, NextFunction } from "express";
import { AuthenticatedUser } from "../api/auth/auth.controller";
export function stopDarthVader() {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const user = req.user as AuthenticatedUser;

    if (user && user.name === "Darth Vader") {
      return res.status(401).json({
        message: "I find your lack of authorization disturbing, Darth Vader.",
      });
    } else {
      next();
    }
  };
}
