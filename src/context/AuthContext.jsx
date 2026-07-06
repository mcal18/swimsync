import { createContext, useContext, useState, useEffect } from "react";
import { auth } from '../config/firebase';
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    };

    async function refreshProfile(currentUser = user) {
        if (!currentUser) {
            setProfile(null);
            return;
        }

        try {
            const profileRef = doc(db, "users", currentUser.uid);
            const profileSnap = await getDoc(profileRef);

            if (profileSnap.exists()) {
                setProfile(profileSnap.data());
            } else {
                setProfile(null);
            }
        } catch (error) {
            console.error("Failed to load profile:", error);
            setProfile(null);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            await refreshProfile(currentUser);

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            profile,
            login,
            signup,
            logout,
            refreshProfile,
            loading
        }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider structural wrap');
    }
    return context;
}