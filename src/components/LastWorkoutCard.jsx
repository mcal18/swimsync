import { Link } from "react-router-dom";
import {
    FiCalendar,
    FiClock,
    FiMapPin,
    FiActivity,
    FiArrowRight
} from "react-icons/fi"
import "../styles/dashboardStyles/lastWorkoutCard.css";

function LastWorkoutCard({ workout }) {
    if (!workout) {
        return (
            <div className="swim-card-glass">
                <h2 className="dashboard-section-title">
                    Last Workout
                </h2>
                <p className="empty-last-workout">
                    No workouts logged yet.
                </p>
                <Link
                    to="/workouts"
                    className="last-workout-link"
                >
                    Log your first workout
                    <FiArrowRight />
                </Link>
            </div>
        );
    }

    const workoutDate = workout.date?.toDate();
    return (
        <div className="swim-card-glass last-workout-card">
            <div className="last-workout-header">
                <div>
                    <h2 className="dashboard-section-title">
                        Last Workout
                    </h2>
                    <p className="dashboard-section-subtitle">
                        Your most recent swim session
                    </p>
                </div>
            </div>
            <h3 className="last-workout-title">
                {workout.title}
            </h3>
            <div className="last-workout-meta">
                <span>
                    <FiCalendar />
                    {workoutDate?.toLocaleDateString()}
                </span>
                <span>
                    <FiMapPin />
                    {workout.distance?.toLocaleString()} yd
                </span>
                <span>
                    <FiClock />
                    {workout.duration} min
                </span>
            </div>
            <div className="last-workout-tags">
                <span>
                    <FiActivity />
                    {workout.focus}
                </span>
                <span>
                    {workout.sessionType}
                </span>
            </div>
            <Link
                to="/workouts"
                className="last-workout-link"
            >
                View all workouts
                <FiArrowRight />
            </Link>
        </div>
    );
}

export default LastWorkoutCard;