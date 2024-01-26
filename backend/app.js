import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { DbConnect } from "./middleware/Db_Connector.js";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/users.js";
import carRouter from "./routes/carRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import webHooksRouter from "./routes/webhook.js";
import { verifyToken } from "./middleware/JWT.js";
import helmet from "helmet";
dotenv.config();
console.log(process.env.DB_URL);
const app = express();
const PORT = 4000;
DbConnect(process.env.DB_URL);
//Middlewares
app.use(express.static("uploads"));
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// API routes
app.get("/", verifyToken, (req, res) => {
  res.send("Welcome to carphan!");
});
app.use("/admin", adminRouter);
app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/booking", bookingRouter);
app.use("/stripe", webHooksRouter);
app.use("/notifications", notificationRouter);
app.listen(PORT, () => console.log(`App listening on port${PORT}`));
