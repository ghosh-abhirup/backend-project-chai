import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localPath) => {
  try {
    if (!localPath) {
      return null;
    }

    // upload file
    const response = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });

    // file has been uploaded successfully
    // console.log("File is uploaded successfully in cloudinary", response.url);
    fs.unlinkSync(localPath);

    return response;
  } catch (error) {
    console.log("Error = ", error);
    fs.unlinkSync(localPath); // remove the locally saved temporary file as the upload fails
    return null;
  }
};

export { uploadOnCloudinary };
