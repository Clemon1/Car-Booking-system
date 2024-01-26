import express, { Router } from "express";
import * as dotenv from "dotenv";
import Stripe from "stripe";
import booking from "../model/bookingModel.js";
import cars from "../model/carsModel.js";
import notification from "../model/notificationModel.js";

dotenv.config();
const stripe = new Stripe(process.env.Stripe_Key);
const router = Router();

const endpointSecret = `${process.env.Secret_Key}`;
router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    // const sig = req.headers["stripe-signature"];

    // let event;

    // try {
    //   event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    // } catch (err) {
    //   res.status(400).send(`Webhook Error: ${err.message}`);
    //   return;
    // }
    const event = req.body;
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("Event Listened", paymentIntent);
        console.log("Metadata", paymentIntent && paymentIntent.customer);
        console.log(
          "Metadata",
          paymentIntent &&
            paymentIntent.customer &&
            paymentIntent.customer.metadata,
        );

        const customer = await stripe.customers.retrieve(
          paymentIntent && paymentIntent.customer,
        );
        const newCarBooking = new booking({
          userId: customer.metadata.userId,
          carId: customer.metadata.carId,
          carName: customer.metadata.carName,
          price: customer.metadata.price,
          email: customer.metadata.email,
          location: customer.metadata.location,
          fullName: customer.metadata.fullName,
          dateFrom: customer.metadata.dateFrom,
          dateTo: customer.metadata.dateTo,
        });

        const saveBooking = await newCarBooking.save();
        await cars.findByIdAndUpdate(saveBooking.carId, {
          $push: { currentBookings: saveBooking._id },
        });

        const carOwner = await cars.findById(saveBooking.carId);
        console.log(carOwner);
        // Adding notification after booking was successful
        const noti = await notification.create({
          userId: carOwner.user,
          title: "New Booking",
          message: `${carOwner.name} has been booked`,
        });
        console.log(noti);
        return res.status(200).json("Booked successfully");

        break;

      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a res to acknowledge receipt of the event
    res.json({ received: true });
  },
);

export default router;
