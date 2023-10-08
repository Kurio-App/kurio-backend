import express from "express"
import { loginController , registerController ,verifyController  } from "../controllers/AuthController.js";



const router = express.Router();



router.post('/login', loginController );
router.post('/register', registerController );
router.put('/verify', verifyController );







export default router;