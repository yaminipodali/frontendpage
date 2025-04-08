const Hackathon = require("./models/Hackathon");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Default Route
app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
});

app.get("/api/hackathons", async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Add a new hackathon
app.post("/api/hackathons", async (req, res) => {
  try {
    const { name, date } = req.body;
    if (!name || !date) {
      return res.status(400).json({ error: "Name and date are required" });
    }
    const newHackathon = new Hackathon({ name, date });
    await newHackathon.save();
    res.status(201).json(newHackathon);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
