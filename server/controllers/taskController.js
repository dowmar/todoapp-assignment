// src/controllers/taskController.js
import prisma from "../models/prismaClient.js";

export const createTask = async (req, res) => {
  const { activityId, title, priority, isActive } = req.body;
  try {
    const task = await prisma.task.create({
      data: { activityId, title, priority, isActive },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTasksForActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: { activityId: parseInt(id) },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, priority, isActive, createdAt } = req.body;

  try {
    const updatedActivity = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, priority, isActive, createdAt },
    });
    res.status(200).json(updatedActivity);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Activity not found" });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
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
