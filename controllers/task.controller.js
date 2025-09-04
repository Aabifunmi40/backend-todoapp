const TaskModel = require("../model/task.model");
// const Task= require("../model/task.model")


// Create task
const createTask = async (req, res) => {
  try {
    const {title, completed} = req.body
    const task = await TaskModel.create({
      title, completed,
    });
    res.status(201).json(task);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    await TaskModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update task (mark as completed or edit title)
const updateTask = async (req, res) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTask, getTasks, deleteTask, updateTask };
