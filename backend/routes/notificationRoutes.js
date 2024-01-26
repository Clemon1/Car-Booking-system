import { Router } from "express";
import {
  editNotification,
  userNotification,
} from "../controller/notification.js";
const router = Router();

router.get("/userNotification/:id", userNotification);
router.patch("/userNotification/:id", editNotification);
export default router;
