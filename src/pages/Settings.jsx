import { exp } from "firebase/firestore/pipelines";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

function Settings() {

    const { user, profile, refreshProfile } = useAuth();

    const [name, setName] = useState("");
    const [team, setTeam] = useState("");
    const [coach, setCoach] = useState("");
    const [mainStroke, setMainStroke] = useState("");

    useEffect(() => {
        if (profile) {
            setName(profile.name || "");
            setTeam(profile.team || "");
            setCoach(profile.coach || "");
            setMainStroke(profile.mainStroke || "");
        }
    }, [profile]);

    async function saveProfile() {
        await updateDoc(
            doc(db, "users", user.uid),
            {
                name,
                team,
                coach,
                mainStroke
            }
        );

        await refreshProfile();
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>This page will let users edit their profile.</p>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />

            <input
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                placeholder="Team"
            />

            <input
                value={coach}
                onChange={(e) => setCoach(e.target.value)}
                placeholder="Coach"
            />

            <input
                value={mainStroke}
                onChange={(e) => setMainStroke(e.target.value)}
                placeholder="Main Stroke"
            />

            <button onClick={saveProfile}>
                Save Profile
            </button>
        </div>
    );
}

export default Settings;