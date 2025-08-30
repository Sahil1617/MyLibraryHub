import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        trim: true
    },
    genere: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum:["Reading", "Finished", "Wishlist"],
        default:"Wishlist"
    },
    userId:{
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Book", BookSchema);

    