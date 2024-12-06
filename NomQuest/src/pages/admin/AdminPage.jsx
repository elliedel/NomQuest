import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContext";
import { signOutUser } from "../../firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

import AdminHomeSection from "../../components/admin/AdminHomeSection";
import AdminStoresSection from "../../components/admin/AdminStoresSection";
import AdminFoodsSection from "../../components/admin/AdminFoodsSection";
import AdminUsersSection from "../../components/admin/AdminUsersSection";
import AdminHelpSection from "../../components/admin/AdminHelpSection";

const AdminPage = () => {
  const { currentUser } = useAuth();
  const displayName = currentUser ? currentUser.displayName : "Admin User";
  const displayFirstName = currentUser ? currentUser.displayName.split(" ")[0] : "Admin User";
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await signOutUser(); // Sign out the user
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="min-h-screen flex flex-row items-center bg-white">
      {/* Sidebar */}
      <aside className="min-h-screen bg-accent text-white w-64 py-6 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 font-playfair">NomQuest</h1>

        <div className="flex flex-col space-y-2">
          <div className="py-2">
            <div
              onClick={toggleDropdown}
              className="flex items-center justify-between cursor-pointer p-2 text-white hover:bg-accent-dark hover:text-light rounded-lg"
            >
              <span className="font-semibold">Admin {displayFirstName}</span>
              <ArrowDropDownCircleIcon />
            </div>

            {dropdownOpen && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 p-2 font-semibold bg-light text-accent rounded-md hover:bg-white"
              >
                <LogoutIcon />
                <span>Logout</span>
              </button>
            )}
          </div>

          <div className="py-2">
            <Link
              to="/admin"
              className="flex items-center gap-2 p-2 font-semibold text-white hover:bg-accent-dark hover:text-light rounded-md"
            >
              <HomeIcon />
              <span>Home</span>
            </Link>

            <Link
              to="/admin/stores"
              className="flex items-center gap-2 p-2 text-white font-semibold hover:bg-accent-dark hover:text-light rounded-md"
            >
              <StorefrontIcon />
              <span>Stores</span>
            </Link>

            <Link
              to="/admin/foods"
              className="flex items-center gap-2 p-2 text-white font-semibold hover:bg-accent-dark hover:text-light rounded-md"
            >
              <FastfoodOutlinedIcon />
              <span>Foods</span>
            </Link>

            <Link
              to="/admin/users"
              className="flex items-center gap-2 p-2 text-white font-semibold hover:bg-accent-dark hover:text-light rounded-md"
            >
              <PeopleOutlineIcon />
              <span>Users</span>
            </Link>
          </div>

          <Link
            to="/admin/help"
            className="flex items-center gap-2 p-2 text-white font-semibold hover:bg-accent-dark hover:text-light rounded-md"
          >
            <HelpOutlinedIcon />
            <span>Help</span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-grow min-h-screen p-8">
        <Routes>
          <Route path="/" element={<AdminHomeSection />} />
          <Route path="stores" element={<AdminStoresSection />} />
          <Route path="foods" element={<AdminFoodsSection />} />
          <Route path="users" element={<AdminUsersSection />} />
          <Route path="help" element={<AdminHelpSection />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPage;
