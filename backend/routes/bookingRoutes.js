import { Router } from "express";
import {
  allBooking,
  userBooking,
  singleBooking,
  createBooking,
  getRecommendedCars,
} from "../controller/bookingController.js";
const router = Router();

router.get("/all", allBooking);
router.get("/userBooking/:id", userBooking);
router.get("/singleBooking/:id", singleBooking);
router.get("/recommendedCars/:id", getRecommendedCars);
router.post("/createBooking", createBooking);
export default router;
