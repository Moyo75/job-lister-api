const express = require('express');
const router = express.Router();
const Job = require('../models/job');

// Get all
router.get('/', async (req, res) => {
  //   res.json({ name: 'John' });
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one
router.get('/:id', getJob, (req, res) => {
  res.json(res.job);
});

// Create
router.post('/', async (req, res) => {
  console.log(req.body);
  const job = new Job({
    title: req.body.title,
    description: req.body.description,
    stack: req.body.stack,
    pay: req.body.pay,
    type: req.body.type,
    location: req.body.location
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
});

// Update
router.patch('/:id', getJob, async (req, res) => {
  if (req.body.title != null) {
    res.job.title = req.body.title;
  }
  if (req.body.description != null) {
    res.job.description = req.body.description;
  }
  if (req.body.stack != null) {
    res.job.stack = req.body.stack;
  }
  if (req.body.pay != null) {
    res.job.pay = req.body.pay;
  }
  if (req.body.type != null) {
    res.job.type = req.body.type;
  }
  if (req.body.location != null) {
    res.job.location = req.body.location;
  }

  try {
    const updatedJob = await res.job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete
router.delete('/:id', getJob, async (req, res) => {
  try {
    await res.job.remove();
    res.json({ message: 'Deleted job' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getJob(req, res, next) {
  let job;

  try {
    job = await Job.findById(req.params.id);
    if (job === null) {
      return res.status(404).json({ message: 'Cannot find job' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.job = job;
  next();
}

module.exports = router;
