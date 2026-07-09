import { FaPersonSwimming } from "react-icons/fa6";
import { FiEdit, FiTrash, FiClock, FiActivity } from "react-icons/fi";

function WorkoutCard({ workout, onEdit, onDelete }) {
    const workoutDate =
        workout.date?.toDate().toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
        }) || "No Date";

    function getFocusBadgeClass(focus) {
        return `badge-${focus
            .toLowerCase()
            .replace(/\s+/g, "-")}`;
    }

    return (
        <div className="swim-card-glass workout-log-card">
            <div className="workout-card-header">
                <span className="workout-meta-date">
                    {workoutDate}
                </span>

                <span className="workout-meta-distance">
                    {workout.distance} yd
                </span>
            </div>

            <h2
                className="workout-card-title"
                onClick={() => onEdit(workout)}
            >
                {workout.title}
                <FiEdit className="edit-icon" />
            </h2>

            <div className="workout-badges">
                {workout.focus && (
                    <span className={`badge ${getFocusBadgeClass(workout.focus)}`}>
                        {workout.focus}
                    </span>
                )}

                {workout.sessionType && (
                    <span className="badge badge-session">
                        {workout.sessionType}
                    </span>
                )}
            </div>

            <hr className="workout-divider" />

            <div className="workout-card-details">
                <div className="detail-row">
                    <span className="detail-label">
                        <FiClock />
                        Duration
                    </span>
                    <span className="detail-value">
                        {workout.duration} min
                    </span>
                </div>

                <div className="detail-row">
                    <span className="detail-label">
                        <FiActivity />
                        Main Set
                    </span>
                    <p className="detail-value-text">
                        {workout.mainSet}
                    </p>
                </div>
            </div>
            <button
                className="delete-btn"
                title="Delete Workout"
                onClick={() => onDelete(workout.id)}>
                <FiTrash />
            </button>

            <div className="card-watermark">
                <FaPersonSwimming />
            </div>
        </div>
    );
}

export default WorkoutCard;