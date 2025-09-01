require('dotenv').config();  // Load .env variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = require("./routes/task.route");
const userRouter = require("./routes/user.route");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.get("/test", (req, res) => {
  res.json({ message: "Test route works ✅" });
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/tasks", router);

// DB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
