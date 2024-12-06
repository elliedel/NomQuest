import React, { useState } from 'react';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

const AdminFoodsSection = () => {
    const [activeTab, setActiveTab] = useState("Food Item");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setIsDropdownOpen(false); // Close dropdown when a tab is selected
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="min-h-full bg-white p-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-primary mb-6">Manage Foods</h2>
                
                {/* Tabs for larger screens */}
                <div className="hidden md:flex justify-center space-x-4 mb-6 border-b border-gray-300">
                    {["Food Item", "Store Item", "Price"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={`px-4 py-2 font-semibold ${
                                activeTab === tab ? "text-primary border-b-2 border-primary" : "text-gray-600"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Dropdown for mobile view */}
                <div className="md:hidden relative mb-6">
                    <button
                        onClick={toggleDropdown}
                        className="w-full flex justify-between px-4 py-2 text-gray-600 bg-gray-100 border border-gray-300 rounded-md text-left"
                    >
                        {activeTab}<span><ArrowDropDownRoundedIcon /></span>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
                            {["Food Item", "Store Item", "Price"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabClick(tab)}
                                    className={`w-full text-left px-4 py-2 ${
                                        activeTab === tab ? "bg-gray-100 text-primary" : "text-gray-600"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tab Content */}
                <div className="p-4">
                    {activeTab === "Food Item" && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Food Items</h3>
                            {/* Add your table or list for food items here */}
                            <p>List or table of food items goes here.</p>
                        </div>
                    )}
                    {activeTab === "Store Item" && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Store Items</h3>
                            {/* Add your table or list for store items here */}
                            <p>List or table of store items goes here.</p>
                        </div>
                    )}
                    {activeTab === "Price" && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Prices</h3>
                            {/* Add your table or list for prices here */}
                            <p>List or table of prices goes here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminFoodsSection;
