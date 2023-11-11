import express from "express";
import {protect} from "../middlewares/auth.js";
import { GetAllUserOutlines  , GetPublicOutlines} from "../controllers/OutlinesController.js";

const router = express.Router();



router.get("/",protect, GetAllUserOutlines);
router.get("/explore", GetPublicOutlines)


export default router;