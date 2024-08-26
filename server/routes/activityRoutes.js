// src/routes/activityRoutes.js
import express from "express";
import {
  createActivity,
  getAllActivities,
  getActivity,
  updateActivity,
  deleteActivity,
} from "../controllers/activityController.js";

const router = express.Router();

router.post("/", createActivity);
router.get("/", getAllActivities);
router.get("/:id", getActivity);
router.patch("/:id", updateActivity);
router.delete("/:id", deleteActivity);

export default router;
