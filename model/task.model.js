const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const TaskModel = new mongoose.model("tasks", taskSchema)

module.exports = TaskModel;
