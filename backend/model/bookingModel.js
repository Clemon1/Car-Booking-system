import { Schema, model } from "mongoose";

const bookinSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    carId: {
      type: Schema.Types.ObjectId,
      ref: "Cars",
    },
    carName: String,
    price: Number,
    email: String,
    fullName: String,
    location: String,
    dateFrom: {
      type: Date,
      required: true,
    },
    dateTo: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const booking = model("Bookings", bookinSchema);

export default booking;
