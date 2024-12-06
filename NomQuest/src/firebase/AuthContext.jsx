import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    async function initializeUser(user) {
        if (user) {
            const tokenResult = await user.getIdTokenResult();
            const isAdmin = !!tokenResult.claims.isAdmin;
            setCurrentUser({ ...user, isAdmin });

            //setCurrentUser({ ...user });
            setUserLoggedIn(true);

            // Fetch user role from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setIsAdmin(userData.isAdmin || false); // Set isAdmin state
            }
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
            setIsAdmin(false); // Reset isAdmin state
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        isAdmin, // Expose isAdmin in context
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
