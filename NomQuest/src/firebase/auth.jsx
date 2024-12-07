import { auth, db } from "./firebaseConfig";
import { getAnalytics, logEvent } from "firebase/analytics";

import { 
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    updatePassword,
    GoogleAuthProvider
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
const analytics = getAnalytics();

export const createUser = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);


    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        isAdmin: false, // For regular users
        createdAt: new Date(),
    });

    // Log user registration event in Firebase Analytics
    logEvent(analytics, "sign_up", {
        method: "Email", // Registration method
        user_id: user.uid,
        email: user.email,
    });

    return userCredential;
};

export const signInUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user already exists in Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        // Add user to Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            isAdmin: false, // For regular users
            createdAt: new Date(),
        });

        logEvent(analytics, "sign_up", {
            method: "Google",
            user_id: user.uid,
            email: user.email,
        });
        return { user, isAdmin: false }; // new user, not admin
    } else {
        const userData = userDoc.data();
        return { user, isAdmin: userData.isAdmin }; // existing user, return admin status
    }

};

export const signOutUser = async () => {
    return await auth.signOut();
};

export const resetPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email);
};

export const changePassword = async (newPassword) => {
    if (auth.currentUser) {
        return await updatePassword(auth.currentUser, newPassword);
    } else {
        throw new Error("No user is currently signed in.");
    }
};

export const sendEmailVerificationLink = async () => {
    if (auth.currentUser) {
        return await sendEmailVerification(auth.currentUser, {
            url: `${window.location.origin}/HomePage`,
        });
    } else {
        throw new Error("No user is currently signed in.");
    }
};
