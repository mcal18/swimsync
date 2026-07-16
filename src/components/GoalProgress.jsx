import '../styles/dashboardStyles/goalProgress.css';
import { FiMap, FiActivity, FiAward, FiTarget } from 'react-icons/fi';
import { getStartOfWeek } from "../utils/dateUtils";

function GoalProgress({ workouts, profile }) {
    const weeklyDistanceGoal = profile?.weeklyDistanceGoal || 10000;
    const weeklyWorkoutGoal = profile?.weeklyWorkoutGoal || 6;
    const weekStart = getStartOfWeek();

    const weeklyWorkouts = workouts.filter(workout => {
        if (!workout.date) return false;
        return workout.date.toDate() >= weekStart;
    });

    const weeklyDistance = weeklyWorkouts.reduce(
        (sum, workout) => sum + (Number(workout.distance) || 0),
        0
    );

    const weeklyWorkoutCount = weeklyWorkouts.length;

    const distancePercent =
        weeklyDistanceGoal > 0
            ? Math.min(
                weeklyDistance / weeklyDistanceGoal, 1
            ) * 100
            : 0;
    const workoutPercent =
        weeklyWorkoutGoal > 0
            ? Math.min(
                weeklyWorkoutCount / weeklyWorkoutGoal, 1
            ) * 100
            : 0;
    const distanceCompleted = weeklyDistance >= weeklyDistanceGoal;
    const workoutCompleted = weeklyWorkoutCount >= weeklyWorkoutGoal;
    const distanceRemaining = Math.max(
        weeklyDistanceGoal - weeklyDistance, 0);
    const workoutRemaining = Math.max(
        weeklyWorkoutGoal - weeklyWorkoutCount, 0);

    return (
        <div className="swim-card-glass goal-progress-card">
            <h2 className="dashboard-section-title">
                Weekly Goals
            </h2>
            <p className="dashboard-section-subtitle">
                Track your weekly training progress toward your goal
            </p>
            <div className="goals-grid">
                <div className="goal-item">
                    <div className="goal-header">
                        <div>
                            <div className="goal-title">
                                <FiMap />
                                <span>Distance</span>
                            </div>
                            <strong>
                                {weeklyDistance.toLocaleString()} / {weeklyDistanceGoal.toLocaleString()} yd
                            </strong>
                        </div>
                        <span
                            className={
                                distanceCompleted
                                    ? "goal-badge completed"
                                    : "goal-badge progress"
                            }
                        >
                            {distanceCompleted
                                ? "Completed"
                                : `${Math.round(distancePercent)}%`}
                        </span>
                    </div>
                    <div>
                        <div className="goal-bar">
                            <div className={`goal-fill ${distanceCompleted ? "completed" : ""}`} style={{ width: `${distancePercent}%` }} />
                        </div>
                        <p className="goal-message">
                            {distanceCompleted ? (
                                <>
                                    <FiTarget />
                                    <span>Distance goal achieved!</span>
                                </>
                            ) : (
                                `${distanceRemaining.toLocaleString()} yd left this week`
                            )}
                        </p>
                    </div>
                </div>
                <div className="goal-item">
                    <div className="goal-header">
                        <div>
                            <div className="goal-title">
                                <FiActivity />
                                <span>Workouts</span>
                            </div>
                            <strong>
                                {weeklyWorkoutCount} / {weeklyWorkoutGoal}
                            </strong>
                        </div>
                        <span
                            className={
                                workoutCompleted
                                    ? "goal-badge completed"
                                    : "goal-badge progress"
                            }
                        >
                            {workoutCompleted
                                ? "Completed"
                                : `${Math.round(workoutPercent)}%`}
                        </span>
                    </div>
                    <div>
                        <div className="goal-bar">
                            <div className={`goal-fill ${workoutCompleted ? "completed" : ""}`} style={{ width: `${workoutPercent}%` }} />
                        </div>
                        <p className="goal-message">
                            {workoutCompleted ? (
                                <>
                                    <FiAward />
                                    <span>Workout goal achieved!</span>
                                </>
                            ) : (
                                `${workoutRemaining} workout${workoutRemaining !== 1 ? "s" : ""} left this week`
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoalProgress;