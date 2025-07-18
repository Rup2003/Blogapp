import express from "express";
import userRouter from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import blogRouter from "./routes/blog.routes.js";

const app = express();
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true, methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["set-cookie", "*"],}));
app.use(express.urlencoded({ extended: true }));

//api
app.use("/api/v1/user", userRouter); //http://localhost:8000/api/v1/user/register
app.use("/api/v1/blog", blogRouter);

//global error handler
app.use(errorHandler);

export default app;
