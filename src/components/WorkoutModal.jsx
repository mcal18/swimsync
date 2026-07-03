import { exp } from "firebase/firestore/pipelines";
import { useEffect, useState } from "react";

function WorkoutModal({
    onClose,
    onSave,
    workoutToEdit
}) {
    const [formData, setFormData] =
        useState({
            title: '',
            distance: '',
            duration: '',
            focus: '',
            mainSet: '',
            difficulty: '',
            date: ''
        });

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (workoutToEdit) {
            let formattedDate = '';
            if (workoutToEdit.date) {
                const dateObj = workoutToEdit.date.toDate ? workoutToEdit.date.toDate() : new Date(workoutToEdit.date);
                formattedDate = dateObj.toISOString().split('T')[0];
            }

            setFormData({
                title: workoutToEdit.title || '',
                distance: workoutToEdit.distance || '',
                duration: workoutToEdit.duration || '',
                focus: workoutToEdit.focus || '',
                mainSet: workoutToEdit.mainSet || '',
                difficulty: workoutToEdit.difficulty || '',
                date: formattedDate
            });
        }
    }, [workoutToEdit]);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        await onSave(formData);
        onClose();
    }

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <h2>{workoutToEdit ? 'Edit Workout' : 'Add Workout'}</h2>

                <form
                    onSubmit={handleSubmit}
                >
                    <input
                        name="title"
                        value={formData.title}
                        placeholder="Workout Title"
                        onChange={handleChange}
                    />

                    <input
                        name="distance"
                        value={formData.distance}
                        type="number"
                        placeholder="Distance"
                        onChange={handleChange}
                    />

                    <input
                        name="duration"
                        value={formData.duration}
                        type="number"
                        placeholder="Duration"
                        onChange={handleChange}
                    />

                    <input
                        name="focus"
                        value={formData.focus}
                        placeholder="Focus"
                        onChange={handleChange}
                    />

                    <input
                        name="mainSet"
                        value={formData.mainSet}
                        placeholder="Main Set"
                        onChange={handleChange}
                    />

                    <input
                        name="difficulty"
                        value={formData.difficulty}
                        type="number"
                        min="1"
                        max="10"
                        placeholder="Difficulty"
                        onChange={handleChange}
                    />

                    <input
                        name="date"
                        value={formData.date}
                        type="date"
                        onChange={handleChange}
                    />

                    <button type="submit" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Workout'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default WorkoutModal;