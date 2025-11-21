import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  url: { type: String, required: true },       // Cloudinary secure_url
  publicId: { type: String, required: true },  // Cloudinary public id / filename
  originalName: String,
  mimeType: String,
  size: Number,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  score: { type: Number, default: null },
  skillsDetected: [String],
  createdAt: { type: Date, default: Date.now }
});

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;