import { registerAuthorRequestValidator } from "./authors.validators";
import express from "express";
import { createAuthor, getAuthors } from "./authors.controller";
import { validateRequest } from "../../middlewares";

const router = express.Router();

router.post<{}>(
  "/",
  validateRequest(registerAuthorRequestValidator),
  async (req, res) => {
    try {
      const newAuthor = await createAuthor(req.body);
      return res.status(201).json(newAuthor);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
      });
    }
  }
);

router.get<{}>("/", async (req, res) => {
  try {
    return res.status(200).json(await getAuthors());
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

export default router;
