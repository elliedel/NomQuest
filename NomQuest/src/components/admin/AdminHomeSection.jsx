import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/firebaseConfig.jsx';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../../firebase/AuthContext';

const AdminHomeSection = () => {
    const { currentUser, isAdmin } = useAuth();
    const displayFirstName = currentUser ? currentUser.displayName.split(" ")[0] : "Admin User";
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const userSnapshot = await getDocs(usersCollection);
                setUserCount(userSnapshot.size);
            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        };

        fetchUserCount();
    }, []);

    return (
        <div className="min-h-full bg-white text-center">
            <h2 className="text-3xl font-semibold text-primary mb-4">
                Hi there, Navigator-in-Chief {displayFirstName}!
            </h2>
            <p className="text-xl">Total Users: {userCount}</p>
        </div>
    );
};

export default AdminHomeSection;