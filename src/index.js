import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Listening in port ", process.env.PORT || 8000);
    });
  })
  .catch((error) => {
    console.log("Error in connect = ", error);
  });
