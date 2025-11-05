import express from "express";
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Auth Route Working ✅");
});

router.post("/register", (req, res) => {
  res.json({ message: "User registered successfully" });
});

export default router;
