import express from "express";
import {
  Book,
  createBook,
  deleteBookById,
  fetchBookById,
  fetchBooks,
  publishBookById,
  unpublishBookById,
  updateBookById,
} from "./books.controller";
import { validateRequest } from "../../middlewares/requestValidation";
import { createBookRequest } from "./books.validators";
import passport from "passport";
import { AuthenticatedUser } from "../auth/auth.controller";
import { stopDarthVader } from "../../middlewares/obiWanKenobi";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    return res.status(200).json(await fetchBooks(req.query));
  } catch (error) {
    next(error);
  }
});

router.get("/:bookId", async (req, res, next) => {
  try {
    return res
      .status(200)
      .json(await fetchBookById(parseInt(req.params.bookId)));
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validateRequest(createBookRequest),
  passport.authenticate("jwt", { session: false }),
  stopDarthVader(),
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
  stopDarthVader(),
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

router.patch(
  "/:bookId/publish",
  passport.authenticate("jwt", { session: false }),
  stopDarthVader(),
  async (req, res, next) => {
    const user = req.user as AuthenticatedUser;

    try {
      return res
        .status(200)
        .json(await publishBookById(parseInt(req.params.bookId), user.id));
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:bookId/unpublish",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const user = req.user as AuthenticatedUser;

    try {
      return res
        .status(200)
        .json(await unpublishBookById(parseInt(req.params.bookId), user.id));
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:bookId",
  passport.authenticate("jwt", { session: false }),
  stopDarthVader(),
  async (req, res, next) => {
    const user = req.user as AuthenticatedUser;

    try {
      return res
        .status(204)
        .json(await deleteBookById(parseInt(req.params.bookId), user.id));
    } catch (error) {
      next(error);
    }
  }
);

export default router;
