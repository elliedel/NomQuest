import React, { useState } from 'react';

const EditStoreModal = ({ isOpen, onClose, onAddStore }) => {
    const [storeName, setStoreName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const dateAdded = new Date().toLocaleDateString();

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddStore({ storeName, location, description, dateAdded });
        onClose();
        // reset form fields
        setStoreName('');
        setLocation('');
        setDescription('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Add Store</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Store Name</label>
                        <input
                            type="text"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full p-2 border rounded resize-none"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="button" onClick={onClose} className="bg-gray-300 p-2 rounded hover:bg-gray-200">
                            Cancel
                        </button>
                        <button type="submit" className="bg-accent text-white p-2 rounded hover:bg-earth">
                            Add Store
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-sm">Date Added: {dateAdded}</p>
            </div>
        </div>
    );
};

export default EditStoreModal;
