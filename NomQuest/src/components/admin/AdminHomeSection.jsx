import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig.jsx';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../../firebase/AuthContext';

const AdminHomeSection = () => {
    const { currentUser, isAdmin } = useAuth();
    const displayFirstName = currentUser ? currentUser.displayName.split(" ")[0] : "Admin User";
    const [userCount, setUserCount] = useState(0);
    const [activeUserCount, setActiveUserCount] = useState(0);
    const [storeCount, setStoreCount] = useState(0);

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const userSnapshot = await getDocs(usersCollection);
                const activeUserQuery = query(usersCollection, where('isActive', '==', true));
                const activeUserSnapshot = await getDocs(activeUserQuery);
                const storesCollection = collection(db, 'stores');
                const storeSnapshot = await getDocs(storesCollection);

                setUserCount(userSnapshot.size);
                setActiveUserCount(activeUserSnapshot.size);
                setStoreCount(storeSnapshot.size);
            } catch (error) {
                console.error('Error fetching user stats:', error);
            }
        };

        fetchUserStats();
    }, []);

    const QuickStatCard = ({ title, value, color }) => (
        <div className={`bg-${color}-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow`}>
            <h3 className={`text-${color}-600 font-semibold mb-2 text-lg`}>{title}</h3>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    );

    return (
        <div className="min-h-full bg-white-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-primary mb-6">
                    Hi there, Navigator-in-Chief {displayFirstName}! 🧭
                </h2>
                
                <div className="bg-white-light grid grid-cols-1 md:grid-cols-3 gap-6">
                    <QuickStatCard 
                        title="Total Users" 
                        value={userCount} 
                        color="lava" 
                    />
                    {/*<QuickStatCard 
                        title="Active Users" 
                        value={activeUserCount} 
                        color="earth" 
                    /> */}
                    <QuickStatCard 
                        title="Total Stores" 
                        value={storeCount} 
                        color="sky" 
                    />
                    {/* add here total Store Food Items */}
                    <QuickStatCard 
                        title="Total Food Items" 
                        value={500}  // Dummy data for total food items
                        color="white" 
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminHomeSection;