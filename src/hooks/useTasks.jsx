import { create, update, destroy, getAllTasksForActivity } from "../api/taskApi.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useTaskHooks() {

    const [isLoading, setIsLoading] = useState(false);
    const [isTaskLoading, setIsTaskLoading] = useState(false);
    const [tasks, setTask] = useState([]);
    const navigate = useNavigate();


    // const loadTaskHook = async () => {
    //     setIsTaskLoading(true);
    //     try {
    //         const data = await getAllTasksForActivity();
    //         setTask(data.data);
    //     } catch (error) {
    //         console.error("Error loading activities:", error);
    //     } finally {
    //         setIsTaskLoading(false);
    //     }
    // };

    const createTaskHook = async (activityId, title, priority, isActive) => {
        const data = {
            activityId, title, priority, isActive
        };
        setIsTaskLoading(true);
        try {
            await create(data);
            const updatedTasks = await getAllTasksForActivity(activityId);
            const storedActivity = JSON.parse(localStorage.getItem('selectedActivity'));
            if (storedActivity) {
                storedActivity.tasks = updatedTasks.data;
                localStorage.setItem('selectedActivity', JSON.stringify(storedActivity));
            }
            return updatedTasks;
        } catch (error) {
            console.error("Error creating task:", error);
            return [];
        } finally {
            setIsTaskLoading(false);
        }
    };

    const updateTaskHook = async (activityId, id, newTitle, newPriority, newStatus, createdAt) => {
        setIsLoading(true);
        try {
            const data = {
                title: newTitle,
                priority: newPriority,
                isActive: newStatus,
                createdAt
            }
            const updatedTask = await update(id, data);
            const updatedTasks = await getAllTasksForActivity(activityId);
            const storedActivity = JSON.parse(localStorage.getItem('selectedActivity'));
            if (storedActivity) {
                storedActivity.tasks = updatedTasks.data;
                localStorage.setItem('selectedActivity', JSON.stringify(storedActivity));
            }
            return updatedTask;
        } catch (error) {
            console.error("Error updating activity:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTaskHook = async (id, activityId) => {
        setIsLoading(true);
        try {
            await destroy(id);
            const updatedTasks = await getAllTasksForActivity(activityId);
            const storedActivity = JSON.parse(localStorage.getItem('selectedActivity'));
            if (storedActivity) {
                storedActivity.tasks = updatedTasks.data;
                localStorage.setItem('selectedActivity', JSON.stringify(storedActivity));
            }
            return updatedTasks;
        } catch (error) {
            console.error("Error deleting activity:", error);
        } finally {
            setIsLoading(false);
        }
    };


    return {
        tasks,
        isTaskLoading,
        createTaskHook,
        isLoading,
        updateTaskHook,
        deleteTaskHook
    }

}