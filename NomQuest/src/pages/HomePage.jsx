import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm.toLowerCase().replace(" ", "_")}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* Header */}
      <header className="bg-primary text-white py-20">
        <h1 className="text-4xl font-bold font-playfair text-center">
          Welcome to NomQuest
        </h1>
        <p className="text-center font-serif mt-2 text-xl">
          Your Neighborhood Food Finder
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex justify-center mt-6">
          <input
            type="text"
            placeholder="What are you craving today?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border text-accent border-gray-300 rounded-l-lg p-3 w-80 md:w-96"
            aria-label="Search for food"
          />
          <button
            type="submit"
            className="bg-accent text-white font-bold py-3 px-4 rounded-r-lg"
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </form>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-10">
        <section className="text-center mt-10">
          <h2 className="font-playfair text-2xl font-semibold text-secondary">
            Discover Delicious Options
          </h2>
          <p className="mt-2 text-lg text-accent">
            Find the best food and drink options in your neighborhood.
          </p>
        </section>

        {/* Featured Categories */}
        <section className="mt-10 w-full max-w-4xl">
          <h3 className="text-xl font-semibold text-lava pb-5">
            Featured Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {categories
              .filter((category) => category.is_featured)
              .map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    navigate(
                      `/${category.category_name
                        .toLowerCase()
                        .replace(" ", "_")}`
                    )
                  }
                  className="group cursor-pointer focus:outline-none"
                  aria-label={`View category: ${category.category_name}`}
                >
                  <div className="relative bg-secondary rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                    {/* Background Image */}
                    <img
                      src="https://images.pexels.com/photos/8058299/pexels-photo-8058299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt={`${category.category_name} category`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Floating Text */}
                    <h4 className="absolute inset-0 flex items-center justify-center bg-accent bg-opacity-50 text-light font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      {category.category_name}
                    </h4>
                  </div>
                </button>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
