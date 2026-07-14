import "../styles/workoutStyles/workouts.css";
import { useEffect, useState } from "react";

import WorkoutModal from "../components/WorkoutModal";
import WorkoutCard from "../components/WorkoutCard";
import WorkoutStats from "../components/WorkoutStats";
import Login from "../components/Login";

import {
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} from "../services/workouts";

import { auth } from "../config/firebase";
import { FaPersonSwimming } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";

function Workouts() {
  const [showModal, setShowModal] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusFilter, setFocusFilter] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

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

  const filteredWorkouts = workouts.filter((workout) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      workout.title?.toLowerCase().includes(search) ||
      workout.focus?.toLowerCase().includes(search) ||
      workout.sessionType?.toLowerCase().includes(search) ||
      workout.mainSet?.toLowerCase().includes(search);

    const matchesFocus = !focusFilter || workout.focus === focusFilter;
    const matchesSession = !sessionFilter || workout.sessionType === sessionFilter;

    return matchesSearch && matchesFocus && matchesSession;
  })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return (a.date?.seconds || 0) - (b.date.seconds || 0);
        case "distance":
          return (b.distance || 0) - (a.distance || 0);
        case "duration":
          return (b.duration || 0) - (a.duration || 0);
        default:
          return (b.date?.seconds || 0) - (a.date?.seconds || 0);
      }
    });

  return (
    <div className="swim-page-content">
      <h1 className="swim-page-heading">Workouts</h1>

      <p className="swim-page-subtitle">
        Track intervals, splits, and custom yardage milestones.
      </p>

      <WorkoutStats workouts={workouts} />

      <div className="workouts-toolbar">
        <div className="toolbar-top">
          <div className="toolbar-info">
            <h2>Workout Log</h2>
            <p>View, edit, and organize your swim sessions.</p>
          </div>

          <button className="add-workout-btn" onClick={() => setShowModal(true)}>
            + Add Workout
          </button>
        </div>

        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search workouts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="workout-filters">
          <select value={focusFilter} onChange={(e) => setFocusFilter(e.target.value)}>
            <option value="">All Focuses</option>
            <option>Freestyle</option>
            <option>Backstroke</option>
            <option>Breaststroke</option>
            <option>Butterfly</option>
            <option>Individual Medley</option>
            <option>Kick</option>
            <option>Drills</option>
            <option>Endurance</option>
            <option>Sprint</option>
            <option>Recovery</option>
          </select>

          <select value={sessionFilter} onChange={(e) => setSessionFilter(e.target.value)}>
            <option value="">All Sessions</option>
            <option>Recovery</option>
            <option>Aerobic</option>
            <option>Threshold</option>
            <option>Sprint</option>
            <option>Race Pace</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date-desc">Newest</option>
            <option value="date-asc">Oldest</option>
            <option value="distance">Longest Distance</option>
            <option value="duration">Longest Duration</option>
          </select>


          {workouts.length === 0 ? (
            <button
              className="add-workout-btn"
              onClick={() => setShowModal(true)}
            >
              Log First Workout
            </button>
          ) : (
            <button
              className="clear-filters-btn"
              onClick={
                () => {
                  setSearchTerm("");
                  setFocusFilter("");
                  setSessionFilter("");
                  setSortBy("date-desc");
                }
              }
            >
              Clear Filters
            </button>
          )}

        </div>
      </div>

      {
        showModal && (
          <WorkoutModal
            onClose={closeModalHandler}
            onSave={handleSaveWorkout}
            workoutToEdit={editingWorkout}
          />
        )
      }

      <div className="workout-log-list">
        {filteredWorkouts.length === 0 ? (
          <div className="empty-workouts">
            <div className="empty-icon">
              <FaPersonSwimming />
            </div>
            <h2>
              {workouts.length === 0
                ? "No workouts yet"
                : "No workouts found"}

            </h2>
            <p>
              {workouts.length === 0
                ? "Your training history will appear here. Start by logging your first swim session."
                : "No workouts match your current filters."}
            </p>
            <button
              className="add-workout-btn"
              onClick={() => setShowModal(true)}
            >
              Log First Workout
            </button>
          </div>
        ) : (
          filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div >
  );
}

export default Workouts;