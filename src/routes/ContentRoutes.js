import {
    CreateStory,
    CreateTextBook,
    CreateChapterController
} from "../controllers/ContentController.js";


import {protect} from "../middlewares/auth.js";

import express from "express";

const router = express.Router();


router.post("/story",protect, CreateStory);
router.post("/textbook",protect, CreateTextBook);
router.post("/chapter/:id/:index",protect, CreateChapterController);






export default router;