import User, { login, signup } from "../models/user.model";
import { sign } from "jsonwebtoken";
import { Types } from "mongoose";

const createToken = (id) => {
  return sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

// login users
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);
    const id = user._id;
    const isAdmin = user.isAdmin;
    const name = user.firstname;

    res.status(200).json({ email, id, isAdmin, name, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { firstname, lastname, email, password, confirmpassword } = req.body;

  try {
    const user = await User.signup(
      firstname,
      lastname,
      email,
      password,
      confirmpassword
    );

    // create a token
    const token = createToken(user._id);
    const id = user._id;
    const isAdmin = user.isAdmin;
    const name = user.firstname;

    res.status(200).json({ email, id, isAdmin, name, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get user details
const getUserdetails = async (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No data found" });
  }

  const user = await User.findById(id, { password: 0 });

  if (!user) {
    return res.status(404).json({ error: "No data found" });
  }

  res.status(200).json(user);
};

// update user
const updateUserdetails = async (req, res) => {
  const { id } = req.params;

  await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  const user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  const firstname = user.firstname;
  const lastname = user.lastname;
  const mobile = user.mobile;
  const address = user.address;
  const avatar = user.avatar;

  res.status(200).json({ id, firstname, lastname, mobile, address, avatar });
};

// delete user
const deleteUserdetails = async (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// get all users
const listAllUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  if (!users) {
    return res.status(404).json({ error: "No data found" });
  }

  res.status(200).json(users);
};

export {
  signupUser,
  loginUser,
  getUserdetails,
  updateUserdetails,
  deleteUserdetails,
  listAllUsers,
};
