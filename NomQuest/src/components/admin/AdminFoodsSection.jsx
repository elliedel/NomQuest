import React, { useState } from "react";

const AdminFoodsSection = () => {
  const [activeTab, setActiveTab] = useState("Food Item");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = ["Food Item", "Store Item", "Price"];

  const sampleData = {
    "Food Item": [
      { id: 1, name: "Sample Food Item", category: "Main Course" },
      { id: 2, name: "Another Food Item", category: "Dessert" },
    ],
    "Store Item": [
      { id: 1, name: "Sample Store", location: "City Center" },
      { id: 2, name: "Another Store", location: "Downtown" },
    ],
    Price: [
      { id: 1, name: "Sample Item", price: "$9.99" },
      { id: 2, name: "Another Item", price: "$4.99" },
    ],
  };

  const data = sampleData[activeTab];

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setSearchTerm("");
    setSelectedItems([]);
    setIsDropdownOpen(false);
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    setSelectedItems(e.target.checked ? data.map((item) => item.id) : []);
  };

  const handleDeleteSelected = () => {
    console.log("Deleting selected items:", selectedItems);
    setSelectedItems([]);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTableContent = () => (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="flex justify-between items-center mb-4 p-4">
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.length > 0 && selectedItems.length === data.length}
            onChange={handleSelectAll}
            className="form-checkbox"
          />
          <span className="text-gray-600">Select All</span>
        </div>
        <div className="relative">
            <input
            type="text"
            placeholder={`Search ${activeTab.toLowerCase()}s`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {selectedItems.length > 0 && (
            <button
                onClick={handleDeleteSelected}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
                Delete {selectedItems.length} Selected
            </button>
            )}
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3">
              <span className="sr-only">Select</span>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Name
            </th>
            {activeTab === "Food Item" && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Category
              </th>
            )}
            {activeTab === "Store Item" && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Location
              </th>
            )}
            {activeTab === "Price" && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Price
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="form-checkbox"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                {activeTab === "Food Item" && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.category}
                  </td>
                )}
                {activeTab === "Store Item" && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.location}
                  </td>
                )}
                {activeTab === "Price" && (
                  <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                )}
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={activeTab === "Food Item" ? 4 : 3}
                className="px-6 py-4 text-center text-gray-500"
              >
                No {activeTab.toLowerCase()}s found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Manage Foods
        </h2>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8 border-b-2 border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-2 transition ${
                activeTab === tab
                  ? "text-primary border-b-2 border-earth"
                  : "text-primary hover:font-semibold"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTableContent()}
      </div>
    </div>
  );
};

export default AdminFoodsSection;
