import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/book.js";
import { errorHandler } from "./errorHandler.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://mylibraryhub.onrender.com"], // add your frontend domain here
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you use cookies or auth headers
  })
);
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("MongoDB is Connected");
    } catch (error) {
        console.log(error);
    }
};

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
    connectDB();
});

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);


app.use(errorHandler);