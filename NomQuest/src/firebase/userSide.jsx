import { db } from "./firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const fetchCategories = async () => {
    try {
        const categoryCollection = collection(db, 'categories');
        const categorySnapshot = await getDocs(categoryCollection);
        return categorySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || null, // Convert timestamp to Date object
            };
        });
    } catch (error) {
        console.error("Error fetching categories: ", error);
        throw new Error("Failed to fetch categorise");
    }
};
