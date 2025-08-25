import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true }, // Full-time, Part-time
    experience: { type: String, required: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // recruiter/admin who posted
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
