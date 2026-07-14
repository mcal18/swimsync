import '../styles/dashboardStyles/dashboardStats.css';

function DashboardStats({ workouts }) {
    const totalWorkouts = workouts.length;
    const totalDistance = workouts.reduce(
        (sum, workout) => sum + (Number(workout.distance) || 0),
        0
    );
    const totalDuration = workouts.reduce(
        (sum, workout) => sum + (Number(workout.duration) || 0),
        0
    );
    const averageDistance =
        totalWorkouts > 0
            ? Math.round(totalDistance / totalWorkouts)
            : 0;
    const averageDuration =
        totalWorkouts > 0
            ? Math.round(totalDuration / totalWorkouts)
            : 0;
    const stats = [
        {
            label: "Total Distance",
            value: `${totalDistance.toLocaleString()} yd`,
        },
        {
            label: "Workouts",
            value: totalWorkouts,
        },
        {
            label: "Avg Distance",
            value: `${averageDistance} yd`,
        },
        {
            label: "Avg Duration",
            value: `${averageDuration} min`,
        },
    ];

    return (
        <div className="dashboard-stats">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="swim-card-glass dashboard-stat-card">
                        <span className="dashboard-stat-label">
                            {stat.label}
                        </span>
                        <h2 className="dashboard-stat-value">
                            {stat.value}
                        </h2>
                </div>
            ))}
        </div>
    );
}

export default DashboardStats;