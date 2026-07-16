import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
    getWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout,
} from "../services/workouts";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    const userId = user?.uid;

    useEffect(() => {
        if (!userId) {
            setWorkouts([]);
            setLoading(false);
            return;
        }
        loadWorkouts();
    }, [userId]);

    async function loadWorkouts() {
        if (!userId) return;
        setLoading(true);

        try {
            const data = await getWorkouts(userId);
            setWorkouts(data);
        } finally {
            setLoading(false);
        }
    }

    async function addWorkout(workout) {
        await createWorkout(userId, workout);
        await loadWorkouts();
    }

    async function editWorkout(id, workout) {
        await updateWorkout(userId, id, workout);
        await loadWorkouts();
    }

    async function removeWorkout(id) {
        await deleteWorkout(userId, id);
        await loadWorkouts();
    }

    return (
        <WorkoutContext.Provider
            value={{
                workouts,
                loading,
                loadWorkouts,
                addWorkout,
                editWorkout,
                removeWorkout,
            }}
        >
            {children}
        </WorkoutContext.Provider>
    );
}

export function useWorkouts() {
    return useContext(WorkoutContext);
}