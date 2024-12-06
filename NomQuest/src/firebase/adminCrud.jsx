
import { db } from "./firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// state admin is active 

export const fetchStores = async () => {
    try {
        const storeCollection = collection(db, 'stores');
        const storeSnapshot = await getDocs(storeCollection);
        return storeSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || null, // Convert timestamp to Date object
            };
        });
    } catch (error) {
        console.error("Error fetching stores: ", error);
        throw new Error("Failed to fetch stores");
    }
};

export const addStore = async (newStore) => {
    try {
        const storeRef = await addDoc(collection(db, "stores"), {
            ...newStore,
            createdAt: new Date(),
        });
        return { id: storeRef.id, ...newStore };
    } catch (error) {
        console.error('Error adding store: ', error);
        throw new Error('Failed to add store');
    }
};

export const updateStore = async (store) => {
    try {
        const storeRef = doc(db, 'stores', store.id);
        await updateDoc(storeRef, store);
    } catch (error) {
        console.error('Error updating store: ', error);
        throw new Error('Failed to update store');
    }
};

export const deleteStore = async (storeId) => {
    try {
        const storeRef = doc(db, 'stores', storeId);
        await deleteDoc(storeRef);
    } catch (error) {
        console.error('Error deleting store: ', error);
        throw new Error('Failed to delete store');
    }
};
