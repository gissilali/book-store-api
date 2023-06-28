import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import authorsRouter from "./api/authors/authors.routes";
import authRouter from "./api/auth/auth.routes";
import booksRouter from "./api/books/books.router";
import middlewares from "./middlewares";
import initPassport from "./config/passport";

require("dotenv").config();

const app = express();

initPassport();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/authors", authorsRouter);
app.use("/books", booksRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
