import { Router } from "express";
import {
  createCars,
  updateCars,
  viewAllCars,
  viewSingleCar,
  rate_And_CommentCar,
  recommendCars,
  viewUsersCars,
} from "../controller/carsController.js";
import multer from "multer";
import { isAdmin, isUser, verifyToken } from "../middleware/JWT.js";

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.get("/all", verifyToken, viewAllCars);
router.get("/userCar", viewUsersCars);
router.get("/:location", recommendCars);

router.get("/single/:id", viewSingleCar);
router.post("/create", upload.single("photo"), createCars);

router.patch("/:id", updateCars);
router.patch("/car/:id", rate_And_CommentCar);

export default router;
