import express from "express";
import jwt from "jsonwebtoken";
import Vital from "../models/Vital.js";

const router = express.Router();

// Simple JWT middleware
function auth(req, res, next){
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;
  if(!token) return res.status(401).json({ msg: "No token" });
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    req.user = decoded.user;
    next();
  }catch(err){
    return res.status(401).json({ msg: "Token invalid" });
  }
}

// Create vital
router.post("/", auth, async (req,res)=>{
  try{
    const { heartRate, spo2, bloodPressure, temp } = req.body;
    const vital = await Vital.create({ patient: req.user.id, heartRate, spo2, bloodPressure, temp });
    res.json(vital);
  }catch(e){
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get my vitals (latest 20)
router.get("/mine", auth, async (req,res)=>{
  try{
    const vitals = await Vital.find({ patient: req.user.id }).sort({ timestamp: -1 }).limit(20);
    res.json(vitals);
  }catch(e){
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
