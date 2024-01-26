import cars from "../model/carsModel.js";
import users from "../model/userModel.js";
import booking from "../model/bookingModel.js";

// view all cars
export const viewAllCars = async (req, res) => {
  try {
    const viewCar = await cars
      .find({})
      .sort({ createdAt: -1 })
      .populate("user")
      .exec();

    res.status(200).json(viewCar);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// users own car
export const viewUsersCars = async (req, res) => {
  try {
    const { user } = req.query;
    const viewCar = await cars.find({ user }).sort({ createdAt: -1 });
    res.status(200).json(viewCar);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// view single car
export const viewSingleCar = async (req, res) => {
  try {
    const { id } = req.params;
    const viewCar = await cars
      .findById(id)
      .populate("user")
      .populate("currentBookings")
      .exec();
    res.status(200).json(viewCar);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
//recommend cars for users based on location

export const recommendCars = async (req, res) => {
  try {
    const { location } = req.params;

    // Find bookings made in the specified location
    const bookingsInLocation = await booking.find({ location });

    // Extract carIds from the bookings
    const carIds = bookingsInLocation.map((booking) => booking.carId);
    // Find cars based on carIds
    const carsBookedInLocation = await cars.find({ _id: { $in: carIds } });

    res.status(200).json(carsBookedInLocation);
  } catch (error) {
    console.error("Error fetching cars booked in the location:", error);
    res
      .status(500)
      .json({ message: "Error fetching cars booked in the location", error });
  }
};
// create a new car
export const createCars = async (req, res) => {
  try {
    const { name, year, description, user, price, vehicleType } = req.body;
    const image = req.file.filename;
    const newCar = new cars({
      name,
      year,
      user,
      image,
      description,
      price,
      vehicleType,
    });
    const savedCar = await newCar.save();
    res.status(200).json(savedCar);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// update an existing car
export const updateCars = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCar = await cars.findByIdAndUpdate(id, {
      $set: req.body,
    });
    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// comment and rate car
export const rate_And_CommentCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, ratings, comment } = req.body;
    const singleCar = await cars.findById(id);

    // Check if the user has already rated this car
    const hasRated = singleCar.ratings.some((rating) =>
      rating.user.equals(user),
    );

    if (hasRated) {
      return res.status(401).json("You have rated this car already");
    } else {
      const newRating = { user, ratings, comment };
      await cars.findByIdAndUpdate(id, {
        $push: { ratings: newRating },
      });
    }

    res.status(200).json("Rating and comment added successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// delete an existing car
export const deleteCars = async () => {};
