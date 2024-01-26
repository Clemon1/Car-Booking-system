import { Router } from "express";
import { RegisterUser, clientLogin } from "../controller/authController.js";
const router = Router();

router.post("/register", RegisterUser);
router.post("/login", clientLogin);

export default router;
