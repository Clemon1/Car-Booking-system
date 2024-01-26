import { Schema, model } from "mongoose";

const carSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    ratings: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
        ratings: {
          type: Number,
          default: 0,
        },
        comment: String,
      },
    ],
    vehicleType: {
      type: String,
      enum: ["Sedan", "SUV", "Convertable", "Automatic"],
      default: "Sedan",
    },
    currentBookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bookings",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const cars = model("Cars", carSchema);
export default cars;
