const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /[A-Z][a-z]/.test(v);
        },
        message: (props) => `${props.value} is not a valid firstName!`,
      },
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    image: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
      min: [6, "Password should be minimum Six characters"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Age should be minimum Eighteen"],
    },
    country: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
