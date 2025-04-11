const express = require("express");
const {
    createJob,
    getJobs,
    updateJob,
    deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/jobs", createJob);
router.get("/jobs", getJobs);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

module.exports = router;