import "../styles/workouts.css";
import { useEffect, useState } from "react";

import WorkoutModal from "../components/WorkoutModal";
import WorkoutCard from "../components/WorkoutCard";
import Login from "../components/Login";

import {
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} from "../services/workouts";

import { auth } from "../config/firebase";

function Workouts() {
  const [showModal, setShowModal] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingWorkout, setEditingWorkout] = useState(null);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      loadWorkouts();
    } else {
      setLoading(false);
    }
  }, [userId]);

  async function loadWorkouts() {
    if (!userId) return;

    try {
      const data = await getWorkouts(userId);
      setWorkouts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveWorkout(workout) {
    if (!userId) return;

    try {
      if (editingWorkout) {
        await updateWorkout(userId, editingWorkout.id, workout);
      } else {
        await createWorkout(userId, workout);
      }

      closeModalHandler();
      await loadWorkouts();
    } catch (error) {
      console.error("Failed to save workout:", error);
    }
  }

  async function handleDelete(workoutId) {
    if (!userId) return;

    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        await deleteWorkout(userId, workoutId);
        await loadWorkouts();
      } catch (error) {
        console.error("Failed to delete workout:", error);
      }
    }
  }

  function openEditModal(workout) {
    setEditingWorkout(workout);
    setShowModal(true);
  }

  function closeModalHandler() {
    setShowModal(false);
    setEditingWorkout(null);
  }

  if (loading) {
    return (
      <div className="swim-page-content">
        <h1 className="swim-page-heading">Workouts</h1>
        <p>Loading workouts...</p>
      </div>
    );
  }

  if (!userId) {
    return <Login />;
  }

  return (
    <div className="swim-page-content">
      <h1 className="swim-page-heading">Workouts</h1>

      <p className="swim-page-subtitle">
        Track intervals, splits, and custom yardage milestones.
      </p>

      <button className="add-workout-btn" onClick={() => setShowModal(true)}>
        + Add Workout
      </button>

      {showModal && (
        <WorkoutModal
          onClose={closeModalHandler}
          onSave={handleSaveWorkout}
          workoutToEdit={editingWorkout}
        />
      )}

      <div className="workout-log-list">
        {workouts.length === 0 ? (
          <div className="swim-card-glass">
            <p>No workouts logged yet.</p>
          </div>
        ) : (
          workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Workouts;