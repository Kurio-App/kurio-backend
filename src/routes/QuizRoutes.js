import express from "express";
import {protect} from "../middlewares/auth.js";
import { CreateQuiz } from "../controllers/QuizController.js";

const router = express.Router();



router.post("/",protect, CreateQuiz);

export default router;