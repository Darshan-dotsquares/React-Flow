const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,

      unique: [true, "Email already in use."],
    },
    companyName: { type: String, required: false },
    jobTitle: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    country: { type: String, required: false },
    password: { type: String, required: true },
    otp: { type: String, required: false },
    otpTimestamp: { type: Date, required: false },

    // Add fields for password reset functionality
    resetToken: { type: String, required: false },
    resetTokenExpiration: { type: Date, required: false },
  },
  { timestamps: true }
);

// Create and export the User model
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
