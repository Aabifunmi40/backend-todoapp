const express = require("express");
const router = express.Router();
const  { createTask, getTasks, deleteTask, updateTask }= require("../controllers/task.controller");


// CRUD endpoints
router.post("/create", createTask);       // Add task
router.get("/getTask", getTasks);          // Get all tasks
router.delete("/deletetask/:id", deleteTask);  // Delete task
router.put("/updatetask/:id", updateTask);     // Update task

module.exports = router;

