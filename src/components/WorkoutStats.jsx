import "../styles/workoutstats.css";
import {
    FiTarget,
    FiClock,
    FiActivity,
    FiTrendingUp
} from "react-icons/fi";

function WorkoutStats({ workouts }) {
    const totalWorkouts = workouts.length;
    const totalDistance = workouts.reduce(
        (sum, workout) => sum + (workout.distance || 0),
        0
    );
    const totalDuration = workouts.reduce(
        (sum, workout) => sum + (workout.duration || 0),
        0
    );
    const averageDistance =
        totalWorkouts > 0
            ? Math.round(totalDistance / totalWorkouts)
            : 0;
    
    function formatMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours === 0) return `${mins} min`;
        return `${hours}h ${mins}m`;
    }

    const stats = [
        {
            icon: <FiActivity />,
            value: totalWorkouts,
            label: "Workouts"
        },
        {
            icon: <FiTarget />,
            value: `${totalDistance.toLocaleString()} yd`,
            label: "Total Distance"
        },
        {
            icon: <FiClock />,
            value: formatMinutes(totalDuration),
            label: "Training Time"
        },
        {
            icon: <FiTrendingUp />,
            value: `${averageDistance} yd`,
            label: "Average Distance"
        }
    ];

    return (
        <div className="stats-grid">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="stat-card"
                >
                    <div className="stat-icon">
                        {stat.icon}
                    </div>
                    <h2 className="stat-value">
                        {stat.value}
                    </h2>
                    <p className="stat-label">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default WorkoutStats;