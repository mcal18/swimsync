import '../styles/workouts.css'; 
import { useEffect, useState } from 'react'; 
import WorkoutModal from '../components/WorkoutModal'; 
import { getWorkouts, createWorkout, deleteWorkout, updateWorkout } from '../services/workouts.js'; 
import { auth } from '../config/firebase.js'; 
import { FaEdit, FaTrash } from 'react-icons/fa';
import Login from '../components/Login';

function Workouts() { 
  const [showModal, setShowModal] = useState(false); 
  const [workouts, setWorkouts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [editingWorkout, setEditingWorkout] = useState(null); 
  
  const userId = auth.currentUser?.uid; 

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
        console.error("Failed to delete item:", error); 
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

  useEffect(() => { 
    if (userId) { 
      loadWorkouts(); 
    } else { 
      setLoading(false); 
    } 
  }, [userId]); 

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
      <p className="swim-page-subtitle"> Track intervals, splits, and custom yardage milestones. </p> 
      <button onClick={() => setShowModal(true)}> + Add Workout </button> 
      
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
            <p>No workouts logged yet</p> 
          </div> 
        ) : ( 
          workouts.map((set) => { 
            const workoutDate = set.date?.toDate().toLocaleDateString( 
              'en-US', { month: 'long', day: '2-digit', year: 'numeric' } 
            ) || 'No Date'; 
            
            return ( 
              <div key={set.id} className="swim-card-glass workout-log-card"> 
                <div className="workout-card-header"> 
                  <span className="workout-meta-date"> {workoutDate} </span> 
                  <span className="workout-meta-distance"> {set.distance} yd </span> 
                </div> 
                <h2 className="workout-card-title" onClick={() => openEditModal(set)} style={{ cursor: 'pointer' }}> 
                  {set.title} <FaEdit className='edit-icon' />
                </h2> 
                <div className="workout-card-details"> 
                  <div className="detail-row"> 
                    <span className="detail-label"> Focus Area: </span> 
                    <span className="detail-value"> {set.focus} </span> 
                  </div> 
                  <div className="detail-row"> 
                    <span className="detail-label"> Main Set Block: </span> 
                    <p className="detail-value-text"> {set.mainSet} </p> 
                  </div> 
                </div> 
                <button onClick={() => handleDelete(set.id)} className="delete-btn" title="Delete Workout"> 
                  <FaTrash />
                </button> 
              </div> 
            ); 
          }) 
        )} 
      </div> 
    </div> 
  ); 
} 

export default Workouts;
