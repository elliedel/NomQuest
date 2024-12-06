import React, { useState, useEffect } from 'react';
import { fetchStores, addStore, updateStore, deleteStore } from '../../firebase/adminCrud';
import AddStoreModal from './AddStoreModal';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';


const AdminStoresSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stores, setStores] = useState([]);
    const [editingStore, setEditingStore] = useState(null);
    const [selectedStores, setSelectedStores] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Load stores from Firestore when component mounts
    useEffect(() => {
        const loadStores = async () => {
            try {
                const storeData = await fetchStores();
                setStores(storeData);  // Set the stores to state
            } catch (error) {
                console.error("Error fetching stores:", error);
            }
        };
        loadStores();
    }, []);

    const handleAddStore = async (newStore) => {
        try {
            const addedStore = await addStore(newStore);
            setStores([...stores, addedStore]);  // Add the new store to the list
        } catch (error) {
            console.error("Error adding store:", error);
        }
    };

    const handleEditStore = (store) => {
        setEditingStore(store);
        setIsModalOpen(true);  // Open modal for editing store
    };

    const handleUpdateStore = async (updatedStore) => {
        try {
            await updateStore(updatedStore);
            setStores(stores.map(store => store.id === updatedStore.id ? updatedStore : store));  // Update store in state
        } catch (error) {
            console.error("Error updating store:", error);
        }
    };

    const handleDeleteStore = async (storeId) => {
        try {
            await deleteStore(storeId);
            setStores(stores.filter(store => store.id !== storeId));  // Remove store from state
        } catch (error) {
            console.error("Error deleting store:", error);
        }
    };

    const handleDeleteSelectedStores = async () => {
        try {
            await Promise.all(selectedStores.map(storeId => deleteStore(storeId)));
            setStores(stores.filter(store => !selectedStores.includes(store.id)));  // Remove selected stores
            setSelectedStores([]);  // Clear selection after deletion
        } catch (error) {
            console.error("Error deleting selected stores:", error);
        }
    };

    const handleSelectStore = (storeId) => {
        setSelectedStores(prevSelectedStores => 
            prevSelectedStores.includes(storeId)
                ? prevSelectedStores.filter(id => id !== storeId)
                : [...prevSelectedStores, storeId]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedStores(stores.map(store => store.id));
        } else {
            setSelectedStores([]);
        }
    };

    const filteredStores = stores.filter(store => 
        store.store_name.toLowerCase().includes(searchTerm.toLowerCase())  // Filter stores based on search term
    );

    return (
        <div className="min-h-full bg-white text-center">
            <h1 className="text-2xl font-bold mb-4">Manage Stores</h1>

            <div className="table-actions flex justify-between">
                <div className="flex">
                    <button
                        onClick={() => {
                            setEditingStore(null);  // Clear any existing store being edited
                            setIsModalOpen(true);  // Open modal for adding store
                        }}
                        className="mb-4 bg-success text-white p-2 rounded"
                    >
                        <AddBusinessIcon />
                    </button>

                    <div className="checkbox-group mb-4 pl-3 flex text-center space-x-3">
                        <label>
                            <input
                                type="checkbox"
                                checked={stores.length > 0 && selectedStores.length === stores.length}  // Check if all stores are selected
                                onChange={handleSelectAll}
                            />
                        </label>
                        {selectedStores.length > 0 && (
                            <button
                                onClick={handleDeleteSelectedStores}
                                className="ml-4 bg-danger text-white px-4 py-2 rounded"
                            >
                                Delete {selectedStores.length} Selected
                            </button>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex items-center border rounded p-2 ml-4">
                    <SearchIcon className="text-dark mr-2" />
                    <input
                        type="text"
                        placeholder="Search stores"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}  // Update search term
                        className="outline-none"
                    />
                </div>
            </div>

            {/* Store list */}
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border">Store Name</th>
                        <th className="border">Location</th>
                        <th className="border">Description</th>
                        <th className="border">Date Added</th>
                        <th className="border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStores.length > 0 ? (
                        filteredStores.map((store) => (
                            <tr key={store.id}>
                                <td className="border">
                                    <div className="flex justify-start px-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedStores.includes(store.id)}  // Check if store is selected
                                            onChange={() => handleSelectStore(store.id)}  // Handle individual store selection
                                        />
                                        <div className="pl-3">
                                            {store.store_name}
                                        </div>
                                    </div>
                                </td>
                                <td className="border">{store.location}</td>
                                <td className="border">{store.description}</td>
                                <td className="border">{new Date(store.createdAt?.seconds * 1000).toLocaleDateString()}</td> {/* Format the timestamp */}
                                <td className="border">
                                    <button
                                        onClick={() => handleEditStore(store)}
                                        className="bg-info text-white px-2 py-1 rounded mr-2"
                                    >
                                        <EditIcon />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteStore(store.id)}
                                        className="bg-danger text-white px-2 py-1 rounded"
                                    >
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">No stores found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Add Store Modal */}
            <AddStoreModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingStore(null);  // Clear editing store when closing modal
                }}
                onAddStore={handleAddStore}
                editingStore={editingStore}  // Pass the store being edited
                setStores={setStores}
            />
        </div>
    );
};

export default AdminStoresSection;