import { registerAuthorRequestValidator } from "./authors.validators";
import express from "express";
import { createAuthor, getAuthors } from "./authors.controller";
import { validateRequest } from "../../middlewares/requestValidation";

const router = express.Router();

router.post<{}>(
  "/",
  validateRequest(registerAuthorRequestValidator),
  async (req, res, next) => {
    try {
      const newAuthor = await createAuthor(req.body);
      return res.status(201).json(newAuthor);
    } catch (error: any) {
      next(error);
    }
  }
);

router.get<{}>("/", async (req, res, next) => {
  try {
    return res.status(200).json(await getAuthors());
  } catch (error: any) {
    next(error);
  }
});

export default router;
