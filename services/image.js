import { imageModel } from "../models/image.js";

export const saveImageInfo = async (filename, path) => {
  try {
    const newImage = new imageModel({
      filename,
      path,
    });

    await newImage.save();
    return newImage;
  } catch (error) {
    throw new Error("Error saving image information");
  }
};
