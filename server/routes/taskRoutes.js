// src/routes/taskRoutes.js
import express from "express";
import {
  createTask,
  getAllTasksForActivity,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/activity/:id", getAllTasksForActivity);
router.delete("/:id", deleteTask);
router.patch("/:id", updateTask);

export default router;
