import React, { useState, useEffect, useCallback } from 'react';
import { Timestamp } from 'firebase/firestore';

const StoreModal = ({ isOpen, onClose, onAddStore, onUpdateStore, store = null, stores = [] }) => {
    const [storeName, setStoreName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    // Reset form when modal opens/closes
    useEffect(() => {
        if (store) {
            setStoreName(store.store_name);
            setLocation(store.location);
            setDescription(store.description);
        } else {
            resetForm();
        }
    }, [store, isOpen]);

    const resetForm = () => {
        setStoreName('');
        setLocation('');
        setDescription('');
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};

        if (storeName.trim().length < 2) {
            newErrors.storeName = "Store name must be at least 2 characters";
        }
        if (location.trim().length < 3) {
            newErrors.location = "Location must be at least 3 characters";
        }
        if (description.trim().length < 10) {
            newErrors.description = "Description must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getNextDocumentId = useCallback(() => {
        return stores.reduce((max, store) => 
            (store.store_id > max ? store.store_id : max), 0) + 1;
    }, [stores]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const storeData = {
            store_id: getNextDocumentId(),
            store_name: storeName.trim(),
            location: location.trim(),
            description: description.trim(),
            createdAt: Timestamp.now(),
        };

        store ? onUpdateStore({ ...store, ...storeData }) : onAddStore(storeData);
        onClose();
        resetForm();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {store ? 'Edit Store' : 'Add New Store'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">Store Name</label>
                        <input
                            type="text"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            placeholder="Enter store name"
                            className={`w-full p-2 border rounded ${errors.storeName ? 'border-red-500' : ''}`}
                        />
                        {errors.storeName && <p className="text-red-500 text-xs mt-1">{errors.storeName}</p>}
                    </div>
                    
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter store location"
                            className={`w-full p-2 border rounded ${errors.location ? 'border-red-500' : ''}`}
                        />
                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                    </div>
                    
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter store description"
                            rows="3"
                            className={`w-full p-2 border rounded resize-none ${errors.description ? 'border-red-500' : ''}`}
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>
                    
                    <div className="flex justify-between mt-6">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            {store ? 'Update Store' : 'Add Store'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoreModal;