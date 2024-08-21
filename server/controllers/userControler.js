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
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(201)
      .send({ message: "User registered successfully", token: token });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
}
