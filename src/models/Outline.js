import mongoose from "mongoose";

const OutlineSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        required: true,
    },
    chapters_number: {
        type: Number,
        required: true,
    }
})

const Outline = mongoose.model("Outline", OutlineSchema);

export default Outline;