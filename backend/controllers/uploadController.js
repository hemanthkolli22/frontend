// controllers/uploadController.js
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "resumes", resource_type: "raw" }, // raw = pdf/doc/docx
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    
    const user = await User.findByIdAndUpdate(
      req.user.id, 
      { resume: result.secure_url },
      { new: true }
    );

    res.json({
      message: "Resume uploaded successfully",
      resume: user.resume,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
