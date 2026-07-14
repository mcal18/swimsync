import { useEffect, useState } from 'react';
import { auth } from "../config/firebase";
import { getWorkouts } from '../services/workouts';

import DashboardStats from "../components/DashboardStats";
import DistanceChart from '../components/DistanceChart';
import PersonalRecords from '../components/PersonalRecords';
import WorkoutsFocusChart from '../components/WorkoutFocusChart';
import Login from "../components/Login";

import "../styles/dashboardStyles/dashboard.css"

function Dashboard() {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <p className="swim-page-subtitlte">
                View your swimming performance and training insights.
            </p>
            <DashboardStats workouts={workouts} />
            <PersonalRecords workouts={workouts} />
            <div className="dashboard-charts-grid">
                <DistanceChart workouts={workouts} />
                <WorkoutsFocusChart workouts={workouts} />
            </div>
        </div>
    );
}

export default Dashboard;