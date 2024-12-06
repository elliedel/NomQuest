import React, { useState } from 'react';
import AddStoreModal from './AddStoreModal';

const AdminStoresSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stores, setStores] = useState([]); // State for storing the list of stores
    const [editingStore, setEditingStore] = useState(null); // State to hold the store being edited

    const handleAddStore = (newStore) => {
        setStores([...stores, newStore]); // Add the new store to the list
    };

    const handleEditStore = (store) => {
        setEditingStore(store);
        setIsModalOpen(true); // Open the modal for editing
    };

    const handleDeleteStore = (storeToDelete) => {
        setStores(stores.filter(store => store !== storeToDelete)); // Remove the store from the list
    };

    return (
        <div className="min-h-full bg-white text-center">
            <h1 className="text-2xl font-bold mb-4">Manage Stores</h1>
            <button
                onClick={() => {
                    setEditingStore(null); // Clear any existing store being edited
                    setIsModalOpen(true);
                }}
                className="mb-4 bg-success text-white p-2 rounded"
            >
                Add Store
            </button>

            {/* Store list */}
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border">Store Name</th>
                        <th className="border">Location</th>
                        <th className="border">Description</th>
                        <th className="border">Date Added</th>
                        <th className="border">Actions</th> {/* Actions Column */}
                    </tr>
                </thead>
                <tbody>
                    {stores.map((store, index) => (
                        <tr key={index}>
                            <td className="border">{store.storeName}</td>
                            <td className="border">{store.location}</td>
                            <td className="border">{store.description}</td>
                            <td className="border">{store.dateAdded}</td>
                            <td className="border">
                                <button
                                    onClick={() => handleEditStore(store)}
                                    className="bg-info text-white px-2 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteStore(store)}
                                    className="bg-danger text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Store Modal */}
            <AddStoreModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingStore(null); // Clear the editing store when closing
                }}
                onAddStore={handleAddStore}
                editingStore={editingStore} // Pass editing store if applicable
                setStores={setStores} // Pass setStores to allow updating
            />
        </div>
    );
};

export default AdminStoresSection;
