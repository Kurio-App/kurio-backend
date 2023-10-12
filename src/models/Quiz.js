import mongoose from "mongoose";

const QuizOptionSchema = new mongoose.Schema({
    option: {
        type: String,
        required: true,
    },
    is_correct: {
        type: Boolean,
        required: true,
    }
})

const QuizitemSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [QuizOptionSchema],
        required: true,
    }
})

const QuizSchema = new mongoose.Schema({
    items: {
        type: [QuizitemSchema],
        required: true,
    }
})

const Quiz = mongoose.model("Quiz", QuizSchema);

export default Quiz;