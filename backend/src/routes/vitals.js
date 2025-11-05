const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Vital = require('../models/Vital');

// Create vital (patient submits)
router.post('/', auth, async (req,res)=>{
  try {
    const { heartRate, spo2, bloodPressure, temp } = req.body;
    const vital = new Vital({ patient: req.user.id, heartRate, spo2, bloodPressure, temp });
    await vital.save();
    res.json(vital);
  } catch(err){ console.error(err); res.status(500).send('Server error'); }
});

// Get last 20 vitals for a patient (patients can see their own; doctors maybe query by patient id)
router.get('/mine', auth, async (req,res)=>{
  try {
    const vitals = await Vital.find({ patient: req.user.id }).sort({ timestamp: -1 }).limit(20);
    res.json(vitals);
  } catch(err){ console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
