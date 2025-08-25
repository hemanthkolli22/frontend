// controllers/jobController.js
import Job from "../models/Job.js";
import Application from "../models/Application.js";

/**
 * @desc    Create a new job
 * @route   POST /api/jobs
 * @access  Private (Recruiter/Admin)
 */
export const createJob = async (req, res) => {
  try {
    const { title, description, location, type, experience } = req.body;

    if (!title || !description || !location || !type || !experience) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const job = await Job.create({
      title,
      description,
      location,
      type,
      experience,
      postedBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({ success: false, message: "Server error creating job" });
  }
};

/**
 * @desc    Get all jobs
 * @route   GET /api/jobs
 * @access  Public
 */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email role");
    return res.status(200).json({ success: true, message: "Jobs fetched successfully", data: jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ success: false, message: "Server error fetching jobs" });
  }
};

/**
 * @desc    Get single job by ID
 * @route   GET /api/jobs/:id
 * @access  Public
 */
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email role");

    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    return res.status(200).json({ success: true, message: "Job fetched successfully", data: job });
  } catch (error) {
    console.error("Error fetching job:", error);
    return res.status(500).json({ success: false, message: "Server error fetching job" });
  }
};

/**
 * @desc    Update a job
 * @route   PUT /api/jobs/:id
 * @access  Private (Recruiter/Admin)
 */
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.status(200).json({ success: true, message: "Job updated successfully", data: updatedJob });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({ success: false, message: "Server error updating job" });
  }
};

/**
 * @desc    Delete a job
 * @route   DELETE /api/jobs/:id
 * @access  Private (Recruiter/Admin)
 */
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await job.deleteOne();

    return res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({ success: false, message: "Server error deleting job" });
  }
};

/**
 * @desc    Apply to a job
 * @route   POST /api/jobs/:id/apply
 * @access  Private (Jobseeker/Admin)
 */
export const applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    if (req.user.role !== "jobseeker" && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Only jobseekers can apply" });
    }

    const existingApplication = await Application.findOne({
      job: job._id,
      applicant: req.user._id,
    });

    if (existingApplication) return res.status(400).json({ success: false, message: "Already applied" });

    const application = await Application.create({ job: job._id, applicant: req.user._id });

    return res.status(201).json({ success: true, message: "Applied successfully", data: application });
  } catch (error) {
    console.error("Error applying to job:", error);
    return res.status(500).json({ success: false, message: "Server error applying to job" });
  }
};

/**
 * @desc    Get applicants for a job
 * @route   GET /api/jobs/:id/applicants
 * @access  Private (Recruiter/Admin)
 */
export const getJobApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const applications = await Application.find({ job: job._id }).populate("applicant", "name email role");

    return res.status(200).json({ success: true, message: "Applicants fetched successfully", data: applications });
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return res.status(500).json({ success: false, message: "Server error fetching applicants" });
  }
};

/**
 * @desc    Get all jobs applied by logged-in user
 * @route   GET /api/jobs/my-applications
 * @access  Private (Jobseeker/Admin)
 */
export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate("job", "title location type experience")
      .populate("applicant", "name email role");

    return res.status(200).json({ success: true, message: "User applications fetched successfully", data: applications });
  } catch (error) {
    console.error("Error fetching user applications:", error);
    return res.status(500).json({ success: false, message: "Server error fetching applications" });
  }
};
