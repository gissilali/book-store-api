import express from "express";
import {
  Book,
  createBook,
  fetchBooks,
  publishBookById,
  updateBookById,
} from "./books.controller";
import { validateRequest } from "../../middlewares/requestValidation";
import { createBookRequest } from "./books.validators";
import passport from "passport";

const router = express.Router();

interface AuthenticatedUser extends Express.User {
  id: number;
  name: string;
  email: string;
  pseudonym: string | null;
}

router.get("/", async (req, res, next) => {
  try {
    return res.status(200).json(await fetchBooks());
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validateRequest(createBookRequest),
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const user = req.user as AuthenticatedUser;

    const {
      title,
      description,
      coverImage,
      price,
    }: Pick<Book, "title" | "description" | "coverImage" | "price"> = req.body;

    try {
      return res.status(201).json(
        await createBook({
          title,
          description,
          authorId: user.id,
          coverImage,
          price,
        })
      );
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  "/:bookId",
  validateRequest(createBookRequest),
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const user = req.user as AuthenticatedUser;
    const {
      title,
      description,
      coverImage,
      price,
    }: Pick<Book, "title" | "description" | "coverImage" | "price"> = req.body;

    try {
      return res.status(200).json(
        await updateBookById(parseInt(req.params.bookId), {
          title,
          description,
          authorId: user.id,
          coverImage,
          price,
        })
      );
    } catch (error) {
      next(error);
    }
  }
);
router.patch("/:bookId/publish", publishBookById);

export default router;
