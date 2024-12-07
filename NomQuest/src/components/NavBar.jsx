import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-light font-playfair text-2xl font-bold">
          NomQuest
        </Link>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search for food..." 
            className="p-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#cc9650] focus:border-transparent"
          />
          <span className="absolute left-3 top-2 text-gray-400">🔍</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
