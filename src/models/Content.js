import mongoose from "mongoose";
import ChapterSchema from "./Chapter.js"

const ContentSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    chapters: {
        type : [mongoose.Schema.Types.ObjectId],
        ref: "Chapter",
        default: [],
    }
    
})

const Texbook = mongoose.model("Textbook", ContentSchema);
const Story = mongoose.model("Story", ContentSchema);

export default {Texbook, Story};