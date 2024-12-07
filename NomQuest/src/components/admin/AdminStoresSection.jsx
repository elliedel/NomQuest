import React, { useState, useEffect } from 'react';
import { fetchStores, addStore, updateStore, deleteStore } from '../../firebase/adminCrud';
import AddStoreModal from './AddStoreModal';

const AdminStoresSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stores, setStores] = useState([]);
    const [editingStore, setEditingStore] = useState(null);
    const [selectedStores, setSelectedStores] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadStores = async () => {
            try {
                const storeData = await fetchStores();
                setStores(storeData);
            } catch (error) {
                console.error("Error fetching stores:", error);
            }
        };
        loadStores();
    }, []);

    const handleAddStore = async (newStore) => {
        try {
            const addedStore = await addStore(newStore);
            setStores([...stores, addedStore]);
        } catch (error) {
            console.error("Error adding store:", error);
        }
    };

    const handleEditStore = (store) => {
        setEditingStore(store);
        setIsModalOpen(true);
    };

    const handleUpdateStore = async (updatedStore) => {
        try {
            await updateStore(updatedStore);
            setStores(stores.map(store => 
                store.id === updatedStore.id ? updatedStore : store
            ));
        } catch (error) {
            console.error("Error updating store:", error);
        }
    };

    const handleDeleteStore = async (storeId) => {
        try {
            await deleteStore(storeId);
            setStores(stores.filter(store => store.id !== storeId));
        } catch (error) {
            console.error("Error deleting store:", error);
        }
    };

    const handleDeleteSelectedStores = async () => {
        try {
            await Promise.all(selectedStores.map(deleteStore));
            setStores(stores.filter(store => !selectedStores.includes(store.id)));
            setSelectedStores([]);
        } catch (error) {
            console.error("Error deleting selected stores:", error);
        }
    };

    const handleSelectStore = (storeId) => {
        setSelectedStores(prev => 
            prev.includes(storeId)
                ? prev.filter(id => id !== storeId)
                : [...prev, storeId]
        );
    };

    const handleSelectAll = (e) => {
        setSelectedStores(
            e.target.checked ? stores.map(store => store.id) : []
        );
    };

    const filteredStores = stores.filter(store => 
        store.store_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Stores</h1>
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={() => {
                            setEditingStore(null);
                            setIsModalOpen(true);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Store
                    </button>

                    {selectedStores.length > 0 && (
                        <button 
                            onClick={handleDeleteSelectedStores}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                            Delete {selectedStores.length} Selected
                        </button>
                    )}
                </div>
            </div>

            <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <input 
                        type="checkbox"
                        checked={stores.length > 0 && selectedStores.length === stores.length}
                        onChange={handleSelectAll}
                        className="form-checkbox"
                    />
                    <span className="text-gray-600">Select All</span>
                </div>

                <div className="relative">
                    <input 
                        type="text"
                        placeholder="Search stores"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 absolute left-2 top-3 text-gray-400" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white-light">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark uppercase tracking-wider">Store Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark uppercase tracking-wider">Date Added</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredStores.length > 0 ? (
                            filteredStores.map((store) => (
                                <tr key={store.id} className="hover:bg-light">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedStores.includes(store.id)}
                                                onChange={() => handleSelectStore(store.id)}
                                                className="mr-3"
                                            />
                                            {store.store_name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{store.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{store.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {store.createdAt 
                                            ? new Date(store.createdAt.seconds * 1000).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            }) 
                                            : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                        <button 
                                            onClick={() => handleEditStore(store)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteStore(store.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                    No stores found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <AddStoreModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddStore={handleAddStore}
                onUpdateStore={handleUpdateStore}
                store={editingStore}
                stores={stores}
            />
        </div>
    );
};

export default AdminStoresSection;