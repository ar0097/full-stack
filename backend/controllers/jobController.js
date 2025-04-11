const Job = require("../models/Job");

// Add Job
exports.createJob = async (req, res) => {
  try {
    const newJob = await Job.create(req.body);
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Jobs (with optional filters)
exports.getJobs = async (req, res) => {
  try {
    const { status, date } = req.query;
    let query = {};

    if (status) query.status = status;
    if (date) query.appliedDate = { $gte: new Date(date) };

    const jobs = await Job.find(query).sort({ appliedDate: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Job Status
exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};