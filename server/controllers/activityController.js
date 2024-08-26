// src/controllers/activityController.js
import prisma from "../models/prismaClient.js";

export const createActivity = async (req, res) => {
  const { email, title } = req.body;
  try {
    const activity = await prisma.activity.create({
      data: { personEmail: email, title },
    });
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllActivities = async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      include: { tasks: true },
    });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await prisma.activity.findUnique({
      where: { id: parseInt(id) },
      include: { tasks: true },
    });
    if (!activity) return res.status(404).json({ error: "Activity not found" });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateActivity = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const updatedActivity = await prisma.activity.update({
      where: { id: parseInt(id) },
      data: { title },
    });
    res.status(200).json(updatedActivity);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Activity not found" });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteActivity = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.activity.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).json();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Activity not found" });
    }
    res.status(500).json({ error: error.message });
  }
};
