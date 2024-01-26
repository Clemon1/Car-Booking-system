import booking from "../model/bookingModel.js";
import cars from "../model/carsModel.js";
import notification from "../model/notificationModel.js";
import users from "../model/userModel.js";
import * as dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.Stripe_Key);
//view all booking
export const allBooking = async (req, res) => {
  try {
    const viewBooking = await booking.find();
    res.status(200).json(viewBooking);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// view a single user bookings
export const userBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = await users.findById(id);
    const viewBooking = await booking
      .find({ userId: currentUser._id })
      .populate("carId")
      .exec();
    res.status(200).json(viewBooking);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// view a single booking
export const singleBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const viewSingleBooking = await booking.findById(id);
    res.status(200).json(viewSingleBooking);
  } catch (err) {
    s;
    res.status(500).json(err.message);
  }
};

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const {
      userId,
      carId,
      carName,
      price,
      email,
      fullName,
      location,
      dateFrom,
      dateTo,
    } = req.body;

    if (
      !userId ||
      !carId ||
      !email ||
      !carName ||
      !price ||
      !fullName ||
      !location ||
      !dateFrom ||
      !dateTo
    ) {
      return res.status(401).json("Details must be provided");
    }

    if (new Date(dateTo) < new Date(dateFrom)) {
      return res.status(401).json("Date range is invalid");
    }

    const existingBooking = await booking.findOne({
      carId,
      $or: [
        {
          $and: [{ dateFrom: { $lt: dateTo } }, { dateTo: { $gt: dateFrom } }],
        },
      ],
    });

    if (existingBooking) {
      return res
        .status(401)
        .json("Sorry, the car is already booked for the specified time range.");
    }

    const customer = await stripe.customers.create({
      email: email,
      metadata: {
        userId: userId,
        carId: carId,
        carName: carName,
        price: price,
        email: email,
        fullName: fullName,
        location: location,
        dateFrom: dateFrom,
        dateTo: dateTo,
      },
    });
    let items = [
      {
        price_data: {
          currency: "GBP",
          product_data: {
            name: carName,
          },
          unit_amount: 100 * price,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customer.id,
      line_items: items,
      mode: "payment",
      success_url: `http://localhost:5173/success`,
      cancel_url: `http://localhost:5173/cancelled`,
    });

    res.status(200).json(session.id);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// Recommendation
export const getRecommendedCars = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await users.findById(userId);
    const otherUsers = await users.find();

    const userBookings = await booking.find({ userId });

    const bookedCarIds = userBookings.map((booking) =>
      booking.carId.toString(),
    );

    const recommendedCars = {};

    otherUsers.forEach((otherUser) => {
      if (otherUser._id.toString() !== userId) {
        otherUser.rentedCars.forEach((rentedCar) => {
          const carId = rentedCar.car._id.toString();
          if (!bookedCarIds.includes(carId)) {
            if (!recommendedCars[carId]) {
              recommendedCars[carId] = {
                totalRating: 0,
                count: 0,
              };
            }
            recommendedCars[carId].totalRating += rentedCar.rating;
            recommendedCars[carId].count++;
          }
        });
      }
    });

    const sortedRecommendedCars = Object.keys(recommendedCars)
      .map((carId) => ({
        carId,
        score:
          recommendedCars[carId].totalRating / recommendedCars[carId].count,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Get top 5 recommended cars

    const recommendedCarsData = await Promise.all(
      sortedRecommendedCars.map(async (rec) => {
        const car = await Car.findById(rec.carId);
        return {
          car,
          score: rec.score,
        };
      }),
    );

    res.json({ recommendedCars: recommendedCarsData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update status of a booking
export const updateStatusBooking = async (req, res) => {
  try {
  } catch (error) {}
};
