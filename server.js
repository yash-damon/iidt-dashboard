const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/dashboardDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define MongoDB Schema
const dashboardSchema = new mongoose.Schema({
  // Define your schema fields here
  // Example: name: String, downloads: Number
});

const DashboardModel = mongoose.model("Dashboard", dashboardSchema);

// Routes
app.get("/api/dashboard", async (req, res) => {
  try {
    const data = await DashboardModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
