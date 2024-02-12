import { Router } from "express";
import { Book } from "../models/bookModel.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all required fields. Title, Author and PublishYear",
      });
    }

    let existingBook;

    existingBook = await Book.findOne({ title: title, author: author });

    if (existingBook) {
      return res.status(400).send({
        message: "Book already present in the authors books list",
      });
    }

    let newBook;

    newBook = new Book({
      title: title,
      author: author,
      publishYear: publishYear,
    });

    await newBook.save();

    return res.status(201).send(newBook);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all required fields. Title, Author and PublishYear",
      });
    }

    await Book.findByIdAndUpdate(id, req.body);

    let newBook = await Book.findByIdAndUpdate(id);

    if (!newBook) {
      return res.status(404).send({ message: "Book not found" });
    } else {
      return res.status(200).json(newBook);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      console.log(result);
      return res.status(404).send({ message: "Book not Deleted" });
    } else {
      return res.status(200).json({
        message: "Book Deleted Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
