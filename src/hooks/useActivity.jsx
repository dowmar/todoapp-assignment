import { get, create, update, destroy } from "../api/activityApi.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useActivityHooks() {

    const [isLoading, setIsLoading] = useState(false);
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const loadActivitiesHook = async () => {
        setIsLoading(true);
        try {
            const data = await get();
            await simulateDelay(1000);
            setActivities(data.data);
        } catch (error) {
            console.error("Error loading activities:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const createActivityHook = async () => {
        await create().then(loadActivitiesHook).catch(console.error);
    };

    const detailActivityHook = async (activity) => {
        localStorage.setItem('selectedActivity', JSON.stringify(activity));
        navigate(`/detail/${activity.id}`);
    }

    const updateTitleHook = async (id, newTitle) => {
        setIsLoading(true);
        try {
            const updatedActivity = await update(id, newTitle);
            setActivities((prev) =>
                prev.map((activity) =>
                    activity.id === id ? { ...activity, title: newTitle } : activity
                )
            );

            const storedActivity = JSON.parse(localStorage.getItem('selectedActivity')) || [];

            // console.log(storedActivities);

            if (storedActivity && storedActivity.id === id) {
                storedActivity.title = newTitle;
                localStorage.setItem('selectedActivity', JSON.stringify(storedActivity));
            }
            return updatedActivity;
        } catch (error) {
            console.error("Error updating activity:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteActivityHook = async (id) => {
        setIsLoading(true);
        try {
            await destroy(id);
            await loadActivitiesHook();
        } catch (error) {
            console.error("Error deleting activity:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadActivitiesHook();
    }, []);

    return {
        activities,
        loadActivitiesHook,
        createActivityHook,
        isLoading,
        deleteActivityHook,
        detailActivityHook,
        updateTitleHook
    }

}