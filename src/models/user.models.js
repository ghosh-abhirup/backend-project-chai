import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    userName: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    fullName: {
      required: true,
      type: String,
      trim: true,
      index: true,
    },
    email: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    password: {
      required: [true, "Password is required"],
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("passowrd")) {
    this.password = bcrypt.hash(this.password, 20);
  }

  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
