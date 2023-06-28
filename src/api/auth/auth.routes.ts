import express from "express";
import { validateRequest } from "../../middlewares/requestValidation";
import { attemptLogin } from "./auth.controller";
import { loginRequestValidator } from "./auth.validators";

const router = express.Router();

router.post<{}>(
  "/login",
  validateRequest(loginRequestValidator),
  async (req, res, next) => {
    try {
      return res.status(200).json(await attemptLogin(req.body));
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;
