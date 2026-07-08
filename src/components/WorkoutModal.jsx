import { useEffect, useState } from "react";
import {
    FiType,
    FiTarget,
    FiClock,
    FiCalendar,
    FiActivity,
    FiList
} from "react-icons/fi";
import { FaPersonSwimming } from "react-icons/fa6";
import { MdOutlineWaves } from "react-icons/md";
import "../styles/workoutmodal.css";

function WorkoutModal({
    onClose,
    onSave,
    workoutToEdit
}) {

    const [formData, setFormData] = useState({
        title: "",
        distance: "",
        duration: "",
        stroke: "",
        focus: "",
        mainSet: "",
        sessionType: "",
        date: ""
    });

    const [saving, setSaving] = useState(false);

    useEffect(() => {

        function handleEscape(e) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };

    }, [onClose]);

    useEffect(() => {

        if (!workoutToEdit) return;

        let formattedDate = "";

        if (workoutToEdit.date) {
            const dateObj = workoutToEdit.date.toDate
                ? workoutToEdit.date.toDate()
                : new Date(workoutToEdit.date);

            formattedDate = dateObj.toISOString().split("T")[0];
        }

        setFormData({
            title: workoutToEdit.title || "",
            distance: workoutToEdit.distance || "",
            duration: workoutToEdit.duration || "",
            stroke: workoutToEdit.stroke || "",
            focus: workoutToEdit.focus || "",
            mainSet: workoutToEdit.mainSet || "",
            sessionType: workoutToEdit.sessionType || "",
            date: formattedDate
        });

    }, [workoutToEdit]);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        await onSave(formData);
        setSaving(false);
        onClose();
    }

    return (

        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="modal-card"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="modal-header">

                    <div className="modal-icon">
                        <FaPersonSwimming />
                    </div>

                    <div>
                        <h2>
                            {workoutToEdit
                                ? "Edit Workout"
                                : "New Workout"}
                        </h2>

                        <p>
                            {workoutToEdit
                                ? "Update your training session."
                                : "Log today's swim workout."}
                        </p>
                    </div>

                </div>

                <form
                    className="modal-form"
                    onSubmit={handleSubmit}
                >


                    <div className="modal-field">
                        <label>Workout Title</label>
                        <div className="modal-input">
                            <FiType />
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Sprint Endurance"
                            />
                        </div>
                    </div>

                    <div className="modal-row">
                        <div className="modal-field">
                            <label>Distance (yd)</label>
                            <div className="modal-input">
                                <FiTarget />
                                <input
                                    name="distance"
                                    type="number"
                                    value={formData.distance}
                                    onChange={handleChange}
                                />
                                <span className="input-unit">yd</span>
                            </div>
                        </div>

                        <div className="modal-field">
                            <label>Duration (min)</label>
                            <div className="modal-input">
                                <FiClock />
                                <input
                                    name="duration"
                                    type="number"
                                    value={formData.duration}
                                    onChange={handleChange}
                                />
                                <span className="input-unit">min</span>
                            </div>
                        </div>
                    </div>

                    <div className="modal-row">
                        <div className="modal-field">
                            <label>Stroke</label>
                            <div className="modal-input">
                                <FaPersonSwimming />
                                <select
                                    name="stroke"
                                    value={formData.stroke}
                                    onChange={handleChange} 
                                >
                                    <option value="">--Select Stroke--</option>
                                    <option>Freestyle</option>
                                    <option>Backstroke</option>
                                    <option>Breaststroke</option>
                                    <option>Butterfly</option>
                                    <option>Individual Medley</option>
                                </select>

                            </div>
                        </div>

                        <div className="modal-field">
                            <label>Focus</label>
                            <div className="modal-input">
                                <MdOutlineWaves />
                                <select
                                    name="focus"
                                    value={formData.focus}
                                    onChange={handleChange}
                                >
                                    <option value="">--Select Focus--</option>
                                    <option>Technique</option>
                                    <option>Kick</option>
                                    <option>Pull</option>
                                    <option>Sprint</option>
                                    <option>Endurance</option>
                                    <option>Drills</option>
                                    <option>Race Pace</option>
                                    <option>Recovery</option>
                                </select>
                            </div>
                        </div>

                        <div className="modal-row">
                            <div className="modal-field">
                                <label>Session Type</label>
                                <div className="modal-input">
                                    <FiActivity />
                                    <select
                                        name="sessionType"
                                        value={formData.sessionType}
                                        onChange={handleChange}
                                    >
                                        <option value="">--Select Type--</option>
                                        <option>Recovery</option>
                                        <option>Aerobic</option>
                                        <option>Threshold</option>
                                        <option>Sprint</option>
                                        <option>Race Pace</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="modal-field">
                            <label>Date</label>
                            <div className="modal-input">
                                <FiCalendar />
                                <input
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="modal-divider" />

                    <div className="modal-field">
                        <label className="modal-label">
                            <FiList />
                            Main Set
                        </label>
                        <textarea
                            name="mainSet"
                            value={formData.mainSet}
                            onChange={handleChange}
                            placeholder="Example: &#10;8×100 Free @1:20&#10;6×50 Kick @1:00&#10;4×25 Sprint @.40"
                        />
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="modal-cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="modal-save-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : workoutToEdit
                                    ? "Update Workout"
                                    : "Save Workout"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WorkoutModal;