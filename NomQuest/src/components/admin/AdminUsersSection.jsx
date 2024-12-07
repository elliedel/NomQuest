import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig.jsx';

const AdminUsersSection = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const userSnapshot = await getDocs(usersCollection);
                const userList = userSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(userList);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSelectAll = () => {
        setIsAllSelected(!isAllSelected);
        setSelectedUsers(isAllSelected ? [] : users.map(user => user.id));
    };

    const handleUserSelect = (userId) => {
        setSelectedUsers(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleDeleteSelected = async () => {
        try {
            await Promise.all(selectedUsers.map(userId => 
                deleteDoc(doc(db, 'users', userId))
            ));
            
            setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
            setSelectedUsers([]);
            setIsAllSelected(false);
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    return (
        <div className="min-h-full bg-white p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Users Management</h2>
                {selectedUsers.length > 0 && (
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">
                            {selectedUsers.length} selected
                        </span>
                        <button 
                            onClick={handleDeleteSelected}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Delete Selected
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-gray-100 p-4 rounded">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">
                                <input 
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Email</th>
                            <th className="p-2 text-left">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="p-2">
                                    <input 
                                        type="checkbox"
                                        checked={selectedUsers.includes(user.id)}
                                        onChange={() => handleUserSelect(user.id)}
                                    />
                                </td>
                                <td className="p-2">{user.displayName}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.role || 'User'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsersSection;