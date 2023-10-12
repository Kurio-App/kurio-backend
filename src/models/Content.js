import mongoose from "mongoose";
import ChapterSchema from "./Chapter.js"

const ContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    chapters: {
        type: Map,
        of: ChapterSchema,
    }
})

const Texbook = mongoose.model("Textbook", ContentSchema);
const Story = mongoose.model("Story", ContentSchema);

export default {Texbook, Story};