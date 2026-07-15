import "../styles/dashboardStyles/trainingInsights.css";
import { FiCalendar, FiTarget, FiTrendingUp, FiMoon } from "react-icons/fi";
import { FaPersonSwimming, FaFire, FaTrophy } from "react-icons/fa6";

function TrainingInsights({
    workouts,
    currentStreak,
    longestStreak,
    lastWorkout,
}) {
    if (workouts.length === 0) {
        return (
            <div className="swim-card-glass dashboard-records-card">
                <h2 className="dashboard-section-title">
                    Training Insights
                </h2>
                <p className="dashboard-section-subtitle">
                    Patterns discovered from your training history
                </p>
                <div className="dashboard-empty-state">
                    <h3>No insights yet</h3>
                    <p>
                        Complete your first workout to unlock training insights
                    </p>
                </div>
            </div>
        );
    }
    const weekdayTotals = {};

    workouts.forEach((workout) => {
        if (!workout.date) return;

        const weekday =
            workout.date
                .toDate()
                .toLocaleDateString("en-US", {
                    weekday: "long",
                });
        weekdayTotals[weekday] = (weekdayTotals[weekday] || 0) + 1;

    });

    const favoriteDay = Object.entries(weekdayTotals).sort(
        (a, b) => b[1] - a[1]
    )[0];

    const focusTotal = {};

    workouts.forEach((workout) => {
        if (!workout.focus) return;
        focusTotal[workout.focus] =
            (focusTotal[workout.focus] || 0) + 1;
    });

    const mostCommonFocus = Object.entries(focusTotal).sort(
        (a, b) => b[1] - a[1]
    )[0];

    const uniqueWeeks = new Set();

    workouts.forEach((workout) => {
        if (!workout.date) return;

        const date = workout.date.toDate();
        const weekStart = new Date(date);
        const day = weekStart.getDay();
        const diff = day === 0
            ? -6
            : 1 - day;

        weekStart.setDate(
            weekStart.getDate() + diff
        );
        weekStart.setHours(0, 0, 0, 0);
        uniqueWeeks.add(weekStart.toISOString());
    });

    const averagePerWeek =
        uniqueWeeks.size > 0
            ? (
                workouts.length /
                uniqueWeeks.size
            ).toFixed(1)
            : 0;

    const sorted = [...workouts].sort(
        (a, b) =>
            (a.date?.seconds || 0) -
            (b.date?.seconds || 0)
    );

    let longestBreak = 0;

    for (let i = 1; i < sorted.length; i++) {
        const previous = sorted[i - 1].date.toDate();
        const current = sorted[i].date.toDate();
        const days = Math.round(
            (current - previous) /
            (1000 * 60 * 60 * 24)
        );
        if (days > longestBreak) {
            longestBreak = days;
        }
    }

    const sessionTotals = {};

    workouts.forEach((workout) => {
        if (!workout.sessionType) return;

        sessionTotals[workout.sessionType] =
            (sessionTotals[workout.sessionType] || 0) + 1;
    });

    const preferredSession = Object.entries(sessionTotals).sort(
        (a, b) => b[1] - a[1]
    )[0];

    return (
        <div className="swim-card-glass training-insights-card">
            <h2 className="dashboard-section-title">
                Training Insights
            </h2>
            <p className="dashboard-section-subtitle">
                Patterns discovered from your training history
            </p>

            <div className="insights-grid">
                <div className="insight">
                    <div className="insight-icon icon-calendar">
                        <FiCalendar />
                    </div>
                    <span>Favorite Day</span>
                    <strong>
                        {favoriteDay?.[0] || "--"}
                    </strong>
                    <small>
                        {favoriteDay
                            ? `${favoriteDay[1]} session${favoriteDay[1] > 1 ? "s" : ""}`
                            : ""}
                    </small>
                </div>
                <div className="insight">
                    <div className="insight-icon icon-focus">
                        <FiTarget />
                    </div>
                    <span>Most Common Focus</span>
                    <strong>
                        {mostCommonFocus?.[0] || "--"}
                    </strong>
                    <small>
                        {mostCommonFocus
                            ? `${mostCommonFocus[1]} workout${mostCommonFocus[1] > 1 ? "s" : ""}`
                            : ""}
                    </small>
                </div>
                <div className="insight">
                    <div className="insight-icon icon-week">
                        <FiTrendingUp />
                    </div>
                    <span>Weekly Average</span>
                    <strong>
                        {averagePerWeek}
                    </strong>
                    <small>
                        workout{Number(averagePerWeek) === 1 ? "" : "s"} per week
                    </small>
                </div>
                <div className="insight">
                    <div className="insight-icon icon-break">
                        <FiMoon />
                    </div>
                    <span>Longest Break</span>
                    <strong>
                        {longestBreak} day{longestBreak === 1 ? "" : "s"}
                    </strong>
                    <small>
                        between sessions
                    </small>
                </div>
                <div className="insight">
                    <div className="insight-icon icon-session">
                        <FaPersonSwimming />
                    </div>
                    <span>Preferred Session</span>
                    <strong>
                        {preferredSession?.[0] || "--"}
                    </strong>
                    <small>
                        Most frequently logged
                    </small>
                </div>
                <div className="insight">
                    <div className="insight-icon icon-fire">
                        <FaFire />
                    </div>
                    <span>Current Streak</span>
                    <strong>
                        {currentStreak} day{currentStreak !== 1 ? "s" : ""}
                    </strong>
                    <small>
                        Consecutive workout days
                    </small>
                </div>
                <div className="insight">
                    <div className="insight-icon icon-trophy">
                        <FaTrophy />
                    </div>
                    <span>Longest Streak</span>
                    <strong>
                        {longestStreak} day{longestStreak !== 1 ? "s" : ""}
                    </strong>
                    <small>
                        Personal best
                    </small>
                </div>
                <div className="insight">
                    <div className="insight-icon icon-last">
                        <FiCalendar />
                    </div>
                    <span>Last Workout</span>
                    <strong>
                        {lastWorkout
                            ? lastWorkout.toLocaleDateString()
                        : "--"}
                    </strong>
                    <small>
                        Most Recent session
                    </small>
                </div>
            </div>
        </div>
    );
}

export default TrainingInsights;