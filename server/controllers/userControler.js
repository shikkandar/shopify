import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Email already in exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 14);

    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res
      .status(201)
      .send({ message: "User registered successfully", token: token });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Wrong Password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.send({ message: "Logged in successfully", token: token });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
}

export async function getUsers(req, res) {
  const { userId } = req.params;

  try {
    const users = await UserModel.findById(userId).select("-password ");
    if (!users) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
}
