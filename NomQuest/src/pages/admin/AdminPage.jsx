import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContext";
import { signOutUser } from "../../firebase/auth";

// Icons
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Import all sections dynamically
const SECTIONS = {
  AdminHomeSection: React.lazy(() => import("../../components/admin/AdminHomeSection")),
  AdminStoresSection: React.lazy(() => import("../../components/admin/AdminStoresSection")),
  AdminFoodsSection: React.lazy(() => import("../../components/admin/AdminFoodsSection")),
  AdminUsersSection: React.lazy(() => import("../../components/admin/AdminUsersSection")),
  AdminHelpSection: React.lazy(() => import("../../components/admin/AdminHelpSection"))
};

// Navigation configuration
const NAV_ITEMS = [
  { 
    path: "/admin", 
    label: "Home", 
    icon: HomeIcon 
  },
  { 
    path: "/admin/stores", 
    label: "Stores", 
    icon: StorefrontIcon 
  },
  { 
    path: "/admin/foods", 
    label: "Foods", 
    icon: FastfoodOutlinedIcon 
  },
  { 
    path: "/admin/users", 
    label: "Users", 
    icon: PeopleOutlineIcon 
  }
];

const AdminPage = () => {
  const { currentUser } = useAuth();
  const displayName = currentUser?.displayName || "Admin User";
  const displayFirstName = displayName.split(" ")[0];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOutUser();
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const renderSidebar = () => (
    <aside className={`
      fixed top-0 left-0 w-64 min-h-screen bg-accent text-white 
      py-6 px-4 transition-transform duration-300 z-50
      ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:relative lg:translate-x-0
    `}>
      <div className="flex justify-between items-center lg:hidden mb-4">
        <h1 className="text-3xl font-bold font-playfair">NomQuest</h1>
        <button 
          onClick={toggleMobileMenu} 
          className="text-white"
          aria-label="Close menu"
        >
          <CloseIcon />
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8 font-playfair hidden lg:block">NomQuest</h1>

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

        {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className="flex items-center gap-2 p-2 text-white font-semibold hover:bg-accent-dark hover:text-light rounded-md"
            onClick={toggleMobileMenu}
          >
            <Icon />
            <span>{label}</span>
          </Link>
        ))}

        <Link
          to="/admin/help"
          className="flex items-center gap-2 p-2 text-white font-semibold hover:bg-accent-dark hover:text-light rounded-md"
          onClick={toggleMobileMenu}
        >
          <HelpOutlinedIcon />
          <span>Help</span>
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={toggleMobileMenu} 
        className="fixed top-4 left-4 z-40 lg:hidden bg-accent text-white p-2 rounded"
        aria-label="Open menu"
      >
        <MenuIcon />
      </button>

      {/* Sidebar */}
      {renderSidebar()}

      {/* MAIN CONTENT */}
      <main className="flex-grow min-h-screen p-8 lg:ml-0">
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<SECTIONS.AdminHomeSection />} />
            <Route path="stores" element={<SECTIONS.AdminStoresSection />} />
            <Route path="foods" element={<SECTIONS.AdminFoodsSection />} />
            <Route path="users" element={<SECTIONS.AdminUsersSection />} />
            <Route path="help" element={<SECTIONS.AdminHelpSection />} />
          </Routes>
        </React.Suspense>
      </main>
    </div>
  );
};

export default AdminPage;