import { Schema, model } from "mongoose";
import { bcrypt } from "bcrypt";
import { validator } from "validator";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["learner", "instructor", "admin"],
    default: "learner",
  },
});

const User = model("User", userSchema);

// Static signup method
userSchema.statics.signup = async function (
  firstname,
  lastname,
  email,
  password,
  confirmpassword
) {
  // validation
  if (!email || !password || !confirmpassword || !firstname || !lastname) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (password !== confirmpassword) {
    throw Error("Password does not match");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstname,
    lastname,
    email,
    password: hash,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

export default User;
