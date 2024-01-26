import { Router } from "express";
import { adminLogin, RegisterAdmin } from "../controller/authController.js";
const router = Router();

router.post("/register", RegisterAdmin);
router.post("/login", adminLogin);

export default router;
