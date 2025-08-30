import express from "express";
import Book from "../models/Book.js";
import auth from "../middleware.js";

const router = express.Router();

// Search & Filter
router.get("/search", auth, async (req, res) => {
  try {
    const { q, genere, status } = req.query;

    const query = { userId: req.user.id }; // ensure user sees only their books

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } }
      ];
    }
    
    if (genere) {
      query.genere = genere;
    }
    if (status) {
      query.status = status;
    }

    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

//Dashboard
router.get("/dashboard", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const totalBooks = await Book.countDocuments({ userId });

    const booksByStatus = await Book.aggregate([
      { $match: { userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const booksBygenere = await Book.aggregate([
      { $match: { userId } },
      { $group: { _id: "$genere", count: { $sum: 1 } } }
    ]);

    res.json({ totalBooks, booksByStatus, booksBygenere });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

//Get all books for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user.id }).sort("-createdAt");
    res.json(books);
  } catch (error) {
    console.error("❌ Error fetching books:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new book
router.post("/", auth, async (req, res) => {
  try {
    const { title, author, genere, year, status } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const book = new Book({
      title,
      author,
      genere,
      year,
      status,
      userId: req.user.id, // set owner from token
    });

    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error("❌ Error creating book:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single book (only if owned by user)
router.get("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });

    res.json(book);
  } catch (error) {
    console.error("❌ Error fetching book:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a book (only if owned by user)
router.put("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });

    const { title, author, genere, year, status } = req.body;
    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (genere !== undefined) book.genere = genere;
    if (year !== undefined) book.year = year;
    if (status !== undefined) book.status = status;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    console.error("❌ Error updating book:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a book (only if owned by user)
router.delete("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });

    await book.deleteOne();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting book:", error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;