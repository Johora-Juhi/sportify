/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5317"] }));

//application route
app.use("/api", router);

// const test = (req: Request, res: Response) => {
//   Promise.reject();
// };

// app.use("/", test);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});
// not found
app.use(notFound);

// error handler middleware
app.use(globalErrorHandler);

export default app;
