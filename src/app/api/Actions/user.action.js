"use server";
import bcrypt from "bcryptjs";
import { dbConnection } from "../dbconnection";
import User from "../Model/user.model";

export const registerUser = async (formData) => {
  try {
    await dbConnection();

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email: formData.email });
    if (existingUser) {
      return { status: false, error: "Email already in use." };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    // Create a new user with the hashed password
    const newUser = {
      ...formData,
      password: hashedPassword,
    };

    await User.create(newUser);
    return { status: true };
  } catch (error) {
    return { status: false, error: error.message };
  }
};
