import users from "../model/userModel.js";
import { createToken } from "../middleware/JWT.js";
import bcrypt from "bcrypt";

// gettng the user

export const getUser = async (req, res) => {
  try {
    let getUser;
    const userId = req.user;
    getUser = await users.findById(userId, "-password");
    res.status(200).json(getUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//For users with the role Users
// Register
export const RegisterUser = async (req, res) => {
  const { firstName, lastName, email, location } = req.body;
  try {
    if (!firstName || !lastName || !email || !location || !req.body.password) {
      return res.status(404).json("Details must be provided");
    }
    // check if the user already exsit
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(401).json("User already registered");
    }
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new users({
      firstName,
      lastName,
      email,
      location,
      password: encryptedPassword,
    });

    const newUser = await user.save();
    const token = await createToken({
      user: newUser._id,
      role: newUser.roles,
    });

    res.cookie("carphanClientToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 2hrs
    });
    console.log(req.cookies);
    const { password, ...otherInfo } = newUser._doc;

    res.status(200).json({ otherInfo, token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// CLient  Login Controller
export const clientLogin = async (req, res) => {
  try {
    // checking for existing user
    const { email } = req.body;
    const checkUser = await users.findOne({ email });
    if (!checkUser) {
      return res
        .status(401)
        .json("This user does not have an account, please register");
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password,
    );
    if (!checkPassword) {
      return res.status(401).json("Invalid Password");
    }
    const token = await createToken({
      user: checkUser._id,
      role: checkUser.roles,
    });

    const { password, ...otherInfo } = checkUser._doc;
    res.cookie("carphanClientToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 2hrs
    });
    res.status(200).json({ otherInfo, token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//For users with the role admin
// Register
export const RegisterAdmin = async (req, res) => {
  const { firstName, lastName, email, location } = req.body;
  try {
    if (!firstName || !lastName || !email || !location || !req.body.password) {
      return res.status(404).json("Details must be provided");
    }
    // check if the user already exsit
    const existingUser = await users.findOne(email);
    if (existingUser) {
      return res.status(401).json("User already registered");
    }
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await users.create({
      firstName,
      lastName,
      email,
      location,
      password: encryptedPassword,
      roles: "admin",
    });
    const token = await createToken({
      user: newUser._id,
      role: newUser.roles,
    });
    res.cookie("adminToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 2hrs
    });
    const { password, ...otherInfo } = newUser._doc;
    res.status(200).json(otherInfo);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// CLient  Login Controller
export const adminLogin = async (req, res) => {
  try {
    // checking for existing user
    const checkUser = await users.findOne({ email: req.body.email });
    if (!checkUser) {
      return res
        .status(401)
        .json("This user does not have an account, please register");
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password,
    );
    if (!checkPassword) {
      return res.status(401).json("Invalid Password");
    }
    if (checkUser.roles === "admin") {
      return res.status(401).json("You cannot login here");
    }
    const token = await createToken({
      user: checkUser._id,
      role: checkUser.roles,
    });
    res.cookie("adminToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 2hrs
    });
    const { password, ...otherInfo } = checkUser._doc;
    res.status(200).json(otherInfo);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await users.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
