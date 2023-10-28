import {
    CreateStory
} from "../controllers/ContentController.js";


import {protect} from "../middlewares/auth.js";

import express from "express";

const router = express.Router();


router.post("/story",protect, CreateStory);



export default router;