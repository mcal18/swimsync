import { FaPersonSwimming } from "react-icons/fa6";
import { FiClock, FiAward } from "react-icons/fi";
import "../styles/dashboardStyles/personalRecords.css";

function PersonalRecords({ workouts }) {
    const longestDistance =
        workouts.length > 0
            ? Math.max(...workouts.map(w => Number(w.distance) || 0))
            : 0;
    const longestDuration =
        workouts.length > 0
            ? Math.max(...workouts.map(w => Number(w.duration) || 0))
            : 0;
    const fastestWorkout =
        workouts.length > 0
            ? workouts.reduce((best, current) => {
                if (!best) return current;

                const bestPace =
                    (Number(best.duration) * 60 || 1) /
                    (Number(best.distance) / 100 || 1);

                const currentPace =
                    (Number(current.duration) * 60 || 1) /
                    (Number(current.distance) / 100 || 1);
                return currentPace < bestPace ? current : best;
            }, null)
            : null;
    function formatPace(workout) {
        if (!workout) return "--";

        const seconds =
            (Number(workout.duration) * 60) /
            (Number(workout.distance) / 100);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);

        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")} / 100yd`;
    }

    return (
        <div className="swim-card-glass dashboard-records-card">
            <h2 className="dashboard-section-title">
                Personal Records
            </h2>
            <p className="dashboard-section-subtitle">
                Your all-time best performance in training
            </p>
            <div className="dashboard-chart-divider"></div>
            <div className="records-grid">
                <div className="record-item">
                    <div className="dashboard-stat-icon icon-distance">
                        <FaPersonSwimming />
                    </div>
                    <span>Longest Swim</span>
                    <strong>{longestDistance.toLocaleString()} yd</strong>
                </div>

                <div className="record-item">
                    <div className="dashboard-stat-icon icon-duration">
                        <FiClock />
                    </div>
                    <span>Longest Session</span>
                    <strong>{longestDuration} min</strong>
                </div>

                <div className="record-item">
                    <div className="dashboard-stat-icon icon-award">
                        <FiAward />
                    </div>
                    <span>Best Pace</span>
                    <strong>{formatPace(fastestWorkout)}</strong>
                    <small className="record-subtext">{fastestWorkout.title}</small>
                </div>
            </div>
        </div>
    );
}

export default PersonalRecords;