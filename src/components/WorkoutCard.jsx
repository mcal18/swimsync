import { FiEdit, FiTrash } from "react-icons/fi";

function WorkoutCard({ workout, onEdit, onDelete }) {
    const workoutDate =
        workout.date?.toDate().toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
        }) || "No Date";

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

            <div className="workout-card-details">
                <div className="detail-row">
                    <span className="detail-label">
                        Focus Area
                    </span>
                    <span className="detail-value">
                        {workout.focus}
                    </span>
                </div>

                <div className="detail-row">
                    <span className="detail-label">
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
        </div>
    );
}

export default WorkoutCard;