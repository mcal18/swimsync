import { useEffect, useState } from 'react';
import { auth } from "../config/firebase";
import { getWorkouts } from '../services/workouts';
import { calculateWorkoutStreks } from '../utils/streakUtils';

import DashboardStats from "../components/DashboardStats";
import DistanceChart from '../components/DistanceChart';
import PersonalRecords from '../components/PersonalRecords';
import WorkoutsFocusChart from '../components/WorkoutFocusChart';
import TrainingInsights from '../components/TrainingInsights';
import GoalProgress from '../components/GoalProgress';
import SkeletonCard from '../components/SkeletonCard';
import Login from "../components/Login";

import "../styles/dashboardStyles/dashboard.css"

function Dashboard() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    const {
        currentStreak,
        longestStreak,
        lastWorkout,
    } = calculateWorkoutStreks(workouts);

    const userId = auth.currentUser?.uid;

    useEffect(() => {
        if (userId) {
            loadWorkouts();
        } else {
            setLoading(false);
        }
    }, [userId]);

    async function loadWorkouts() {
        try {
            const data = await getWorkouts(userId);
            setWorkouts(data);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="swim-page-content">
                <h1 className="swim-page-heading">
                    Dashboard
                </h1>

                <p className="swim-page-subtitle">
                    Loading analytics...
                </p>

                <SkeletonCard type="stats" />
                <SkeletonCard type="records" />
                <SkeletonCard type="charts" />
            </div>
        );
    }

    if (!userId) {
        return <Login />;
    }

    return (
        <div className="swim-page-content">
            <h1 className="swim-page-heading">
                Dashboard
            </h1>
            <p className="swim-page-subtitle">
                View your swimming performance and training insights.
            </p>
            <DashboardStats workouts={workouts} />
            <PersonalRecords workouts={workouts} />
            <TrainingInsights
                workouts={workouts}
                currentStreak={currentStreak}
                longestStreak={longestStreak}
                lastWorkout={lastWorkout}
            />
            <GoalProgress workouts={workouts} />
            <div className="dashboard-charts-grid">
                <DistanceChart workouts={workouts} />
                <WorkoutsFocusChart workouts={workouts} />
            </div>
        </div>
    );
}

export default Dashboard;