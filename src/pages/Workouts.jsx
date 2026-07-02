import '../styles/workouts.css'

function Workouts() {
    return (
        <div className="swim-page-content">
            <h1 className="swim-page-heading">Workouts</h1>
            <p className="swim-page-subtitle">Review your training log metrics and coaching sets.</p>

            <div className="workouts-container">
                <p className="workout-log-empty">No workouts logged this week yet.</p>
            </div>
        </div>
    );
}

export default Workouts;