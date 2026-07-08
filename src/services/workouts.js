import { db } from '../config/firebase';
import { collection, getDocs, addDoc, serverTimestamp, Timestamp, doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';

export async function getWorkouts(uid) {
  try {
    const workoutsRef = collection(db, 'users', uid, 'workouts');
    const q = query(
      workoutsRef,
      orderBy("date", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting workouts:', error);
    return [];
  }
}

export async function createWorkout(uid, workoutData) {
  try {
    const workoutsRef = collection(db, 'users', uid, 'workouts');
    await addDoc(workoutsRef, {
      ...workoutData,
      distance: workoutData.distance
        ? Number(workoutData.distance)
        : null,
      duration: workoutData.duration
        ? Number(workoutData.duration)
        : null,
      date: workoutData.date ? Timestamp.fromDate(new Date(workoutData.date)) : serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteWorkout(uid, workoutId) {
  try {
    const workoutDocRef = doc(db, 'users', uid, 'workouts', workoutId);
    await deleteDoc(workoutDocRef);
  } catch (error) {
    console.error('Error deleting workout:', error);
    throw error;
  }
}

export async function updateWorkout(uid, workoutId, workoutData) {
  try {
    const workoutDocRef = doc(db, 'users', uid, 'workouts', workoutId);
    await updateDoc(workoutDocRef, {
      ...workoutData,
      distance: workoutData.distance
        ? Number(workoutData.distance)
        : null,
      duration: workoutData.duration
        ? Number(workoutData.duration)
        : null,
      date: workoutData.date ? Timestamp.fromDate(new Date(workoutData.date)) : serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating workout:', error);
    throw error;
  }
}
