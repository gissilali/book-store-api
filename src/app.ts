import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import authRouter from "./api/authors/authors.routes";
import * as middlewares from "./middlewares";

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/authors", authRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
