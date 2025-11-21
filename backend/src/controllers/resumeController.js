import cloudinary from "../lib/cloudinary.js";
import streamifier from "streamifier";
import Resume from "../models/Resume.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Allowed MIME Types
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain"
    ];

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Invalid file type" });
    }

    // Extract extension
    const ext = req.file.originalname.split(".").pop().toLowerCase();

    // Safe filename
    const safeName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");

    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",  
        folder: "resumes",
        use_filename: true,
        unique_filename: false,
        filename_override: safeName,
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary error", error);
          return res.status(500).json({ error: "Upload failed" });
        }

        // Save metadata
        const resume = await Resume.create({
          url: result.secure_url,
          publicId: result.public_id,
          originalName: req.file.originalname,
          mimeType: req.file.mimetype,
          size: req.file.size,
          uploadedBy: req.user.id,
        });

        return res.json({ success: true, resume });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal error" });
  }
};
