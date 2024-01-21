import multer from "multer";
import * as imageService from "../services/image.js";

export const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("user_file");

export const imageUpload = async (req, res) => {
  try {
    const { filename, path } = req.file;

    // Save image information to MongoDB using the service
    const newImage = await imageService.saveImageInfo(filename, path);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
