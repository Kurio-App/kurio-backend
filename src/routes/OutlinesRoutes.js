import express from "express";
import {protect} from "../middlewares/auth.js";
import { GetAllOutlines } from "../controllers/OutlinesController.js";

const router = express.Router();



router.get("/",protect, GetAllOutlines);

export default router;