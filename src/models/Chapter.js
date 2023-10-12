import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    voice: {
        type: [String],
        required: true,
    }
})

module.exports = ChapterSchema