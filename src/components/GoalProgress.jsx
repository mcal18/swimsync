import '../styles/dashboardStyles/goalProgress.css';

function GoalProgress({ workouts }) {
    const weekly_distance_goal = 10000;
    const weekly_workout_goal = 6;
    const today = new Date();
    const weekStart = new Date(today);
    const day = weekStart.getDay();
    const diff = day === 0
        ? -6
        : 1 - day;
    weekStart.setDate(
        weekStart.getDate() + diff
    );
    weekStart.setHours(0, 0, 0, 0);

    const weeklyWorkouts = workouts.filter(workout => {
        if(!workout.date) return false;
        return workout.date.toDate() >= weekStart;
    });
    
    const weeklyDistance = weeklyWorkouts.reduce (
        (sum, workout) => sum + (Number(workout.distance) || 0),
        0
    );

    const weeklyWorkoutCount = weeklyWorkouts.length;

    const distancePercent = Math.min(weeklyDistance / weekly_distance_goal, 1) * 100;
    const workoutPercent = Math.min(weeklyWorkoutCount / weekly_workout_goal, 1) * 100;
    return (
        <div className="swim-card-glass goal-progress-card">
            <h2 className="dashboard-section-title">
                Weekly Goals
            </h2>
            <p className="dashboard-section-suntitle">
                Track your weekly training progress toward your goal
            </p>

            <div className="goal-item">
                <div className="goal-header">
                    <span>Distance</span>
                    <strong>
                        {weeklyDistance.toLocaleString()} / {weekly_distance_goal.toLocaleString()} yd
                    </strong>
                </div>
                <div>
                    <div className="goal-bar">
                        <div className="goal-fill" style={{width: `${distancePercent}%`}}/>
                    </div>
                </div>
                <div className="goal-header">
                    <span>Workouts</span>
                    <strong>
                        {weeklyWorkoutCount} / {weekly_workout_goal}
                    </strong>
                </div>
                <div>
                    <div className="goal-bar">
                        <div className="goal-fill" style={{width: `${workoutPercent}%`}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoalProgress;