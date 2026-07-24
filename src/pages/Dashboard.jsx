import { useAuth } from '../context/AuthContext';
import { useWorkouts } from "../context/WorkoutContext";
import { calculateWorkoutStreks } from '../utils/streakUtils';

import DashboardStats from "../components/DashboardStats";
import DistanceChart from '../components/DistanceChart';
import PersonalRecords from '../components/PersonalRecords';
import WorkoutsFocusChart from '../components/WorkoutFocusChart';
import TrainingInsights from '../components/TrainingInsights';
import LastWorkoutCard from '../components/LastWorkoutCard';
import GoalProgress from '../components/GoalProgress';
import SkeletonCard from '../components/SkeletonCard';
import Login from "../components/Login";

import "../styles/dashboardStyles/dashboard.css"

function Dashboard() {
    const { user, profile } = useAuth();
    const { workouts, loading } = useWorkouts();

    function getGreeting() {
        const hour = new Date().getHours();

        if (hour < 12) {
            return "Good morning";
        }

        if (hour < 18) {
            return "Good afternoon";
        }

        return "Good evening";
    }

    const displayName =
        profile?.name?.trim() ||
        user?.displayName ||
        user?.email?.split("@")[0] ||
        "Swimmer";

    const {
        currentStreak,
        longestStreak,
        lastWorkout,
    } = calculateWorkoutStreks(workouts);

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

    if (!user) {
        return <Login />;
    }

    return (
        <div className="swim-page-content">
            <div className="dashboard-welcome">
                <h1 className="swim-page-heading">
                    {getGreeting()}, {displayName}! 👋
                </h1>
                <p className="swim-page-subtitle">
                    {workouts.length === 0
                        ? "Let's log your first swim session!"
                        : `You've logged ${workouts.length} workout${workouts.length !== 1 ? "s" : ""}. Keep it up!`}
                </p>
            </div>
            <DashboardStats workouts={workouts} />

            <div className="dashboard-overview-grid">
                <LastWorkoutCard workout={lastWorkout} />
                <GoalProgress workouts={workouts} profile={profile} />
            </div>

            <div className="dashboard-charts-grid">
                <DistanceChart workouts={workouts} />
                <WorkoutsFocusChart workouts={workouts} />
            </div>

            <div className="dashboard-insights-grid">
                <TrainingInsights
                    workouts={workouts}
                    currentStreak={currentStreak}
                    longestStreak={longestStreak}
                    lastWorkout={lastWorkout}
                />
                <PersonalRecords workouts={workouts} />
            </div>Ï

        </div>
    );
}

export default Dashboard;