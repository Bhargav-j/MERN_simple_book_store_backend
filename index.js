import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import booksRouter from "./routes/books_routes.js";
import "dotenv/config";

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// app.use(cors())

app.use(express.json());

app.use("/books", booksRouter);

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT || 5000, () => console.log("Listening to the server..."));
  })
  .catch((error) => {
    console.log(error);
  });
