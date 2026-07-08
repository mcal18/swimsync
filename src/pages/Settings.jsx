import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import "../styles/settings.css";
import { FiLogOut, FiUsers, FiAward, FiMail, FiCalendar } from "react-icons/fi";
import { FaPersonSwimming } from "react-icons/fa6";

function Settings() {
    const { user, profile, refreshProfile, logout } = useAuth();
    const [name, setName] = useState("");
    const [team, setTeam] = useState("");
    const [coach, setCoach] = useState("");
    const [mainStroke, setMainStroke] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (profile) {
            setName(profile.name || "");
            setTeam(profile.team || "");
            setCoach(profile.coach || "");
            setMainStroke(profile.mainStroke || "");
        }
    }, [profile]);

    const profileCompletion = calculateProfileCompletion();

    // Helper to get initials for the avatar
    function getInitials(fullName) {
        if (!fullName) return "U";
        return fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    }

    function calculateProfileCompletion() {
        const total = 6;
        let completed = 2; // email + createdAt
        if (name) completed++;
        if (team) completed++;
        if (coach) completed++;
        if (mainStroke) completed++;
        return Math.round((completed / total) * 100);
    }

    function formatMemberSince(timestamp) {
        if (!timestamp) return "Recently joined";

        const date = timestamp.toDate();

        return date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
    }

    async function saveProfile(e) {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await updateDoc(doc(db, "users", user.uid), {
                name,
                team,
                coach,
                mainStroke,
            });
            await refreshProfile();
            setMessage("Profile saved successfully!");
            setTimeout(() => {
                setMessage("");
            }, 3000);
            setSaved(true);
            setTimeout(() => {
                setSaved(false);
            }, 2000)
        } catch (error) {
            setMessage("Error saving profile. Please try again.");
            setTimeout(() => {
                setMessage("");
            }, 3000);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="settings-page">
            <div className="settings-header">
                <h1>Profile</h1>
                <p>Manage your account details and preferences.</p>
            </div>

            <div className="settings-card">
                <div className="settings-profile">
                    <div className="settings-avatar">
                        {getInitials(name)}
                    </div>
                    <div className="settings-profile-info">
                        <h2>{name || "No Name"}</h2>
                        <p className="settings-profile-email">
                            <FiMail /> {user?.email}
                        </p>
                        <p className="settings-member-since">
                            <FiCalendar /> Member since {formatMemberSince(profile?.createdAt)}

                        </p>
                        <div className="settings-profile-badges">
                            <div className="profile-badge">
                                <FiUsers /> {team || "No Team"}
                            </div>

                            <div className="profile-badge">
                                <FiAward /> {coach ? `Coach ${coach}` : "No Coach"}
                            </div>

                            <div className="profile-badge">
                                <FaPersonSwimming /> {mainStroke ? `${mainStroke} Specialist` : "No main stroke selected"}
                            </div>

                        </div>
                    </div>
                </div>

                <div className="profile-completion">
                    <div className="completion-header">
                        <span>Profile Strength</span>
                        <span>{profileCompletion}%</span>
                    </div>

                    <div className="completion-bar">
                        <div className="completion-fill" style={{
                            width: `${profileCompletion}%`,
                            background:
                                profileCompletion < 50
                                    ? "#ef4444"
                                    : profileCompletion < 80
                                        ? "#f59e0b"
                                        : "linear-gradient(90deg,var(--pool-blue),var(--turquoise))"
                        }} />
                    </div>
                </div>

                <hr className="settings-divider" />

                <form className="settings-form" onSubmit={saveProfile}>
                    <div className="settings-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            className="settings-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="settings-group">
                        <label htmlFor="team">Team</label>
                        <input
                            id="team"
                            className="settings-input"
                            value={team}
                            onChange={(e) => setTeam(e.target.value)}
                            placeholder="Enter your team"
                        />
                    </div>

                    <div className="settings-group">
                        <label htmlFor="coach">Coach</label>
                        <input
                            id="coach"
                            className="settings-input"
                            value={coach}
                            onChange={(e) => setCoach(e.target.value)}
                            placeholder="Enter your coach"
                        />
                    </div>

                    <div className="settings-group">
                        <label htmlFor="mainStroke">Main Stroke</label>
                        <input
                            id="mainStroke"
                            className="settings-input"
                            value={mainStroke}
                            onChange={(e) => setMainStroke(e.target.value)}
                            placeholder="e.g., Freestyle, Butterfly"
                        />
                    </div>

                    <hr className="settings-divider" />

                    <div className="settings-actions">
                        <button
                            type="submit"
                            className={`save-profile-btn ${saved ? "saved" : ""}`}
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : saved
                                    ? "✓ Saved"
                                    : "Save Profile"}
                        </button>

                        <button
                            type="button"
                            className="logout-btn"
                            onClick={logout}
                        >
                            <FiLogOut />
                            Logout
                        </button>
                    </div>
                </form>

                {message && (
                    <div className="settings-success">
                        {message}
                    </div>
                )}
            </div>
        </div >
    );
}

export default Settings;
