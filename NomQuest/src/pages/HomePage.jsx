import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import SearchIcon from "@mui/icons-material/Search";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import CakeIcon from "@mui/icons-material/Cake";
import DrinksIcon from "@mui/icons-material/LocalBar";

const ICON_MAP = {
  Restaurants: <RestaurantMenuIcon className="text-4xl" />,
  "Fast Food": <LocalPizzaIcon className="text-4xl" />,
  Desserts: <CakeIcon className="text-4xl" />,
  Drinks: <DrinksIcon className="text-4xl" />
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedCategories = async () => {
      try {
        const categoriesCollection = collection(db, "categories");
        const q = query(categoriesCollection, where("isFeatured", "==", true));
        const snapshot = await getDocs(q);
        const fetchedCategories = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(fetchedCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured categories:", error);
        setLoading(false);
      }
    };

    fetchFeaturedCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm.toLowerCase().replace(" ", "_")}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <header className="bg-primary text-white py-20 relative overflow-hidden">
        {/* Previous header implementation */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-accent to-secondary"></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl font-bold font-playfair text-center">
            Welcome to NomQuest
          </h1>
          <p className="text-center font-serif mt-2 text-xl">
            Your Neighborhood Food Finder
          </p>

          <form onSubmit={handleSearch} className="flex justify-center mt-6">
            <input
              type="text"
              placeholder="What are you craving today?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border text-accent border-gray-300 rounded-l-lg p-3 w-80 md:w-96 shadow-md focus:ring-2 focus:ring-accent transition-all"
              aria-label="Search for food"
            />
            <button
              type="submit"
              className="bg-accent text-white font-bold py-3 px-4 rounded-r-lg shadow-md hover:bg-secondary transition-colors"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          </form>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-10">
        <section className="text-center mt-10 max-w-xl">
          <h2 className="font-playfair text-2xl font-semibold text-secondary">
            Discover Delicious Options
          </h2>
          <p className="mt-2 text-lg text-accent">
            Find the best food and drink options in your neighborhood.
          </p>
        </section>

        <section className="mt-10 w-full max-w-4xl">
          <h3 className="text-xl font-semibold text-secondary pb-5 text-center">
            Browse Categories
          </h3>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
              {[...Array(4)].map((_, index) => (
                <div 
                  key={index}
                  className="bg-gray-200 animate-pulse rounded-lg h-40"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
              {categories.map((category) => (
                <div 
                  key={category.id}
                  className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                  onClick={() => navigate(`/${category.slug}`)}
                >
                  <div className="flex justify-center mb-4 text-accent">
                    {ICON_MAP[category.name] || <RestaurantMenuIcon className="text-4xl" />}
                  </div>
                  <h4 className="font-bold text-secondary mb-2">{category.name}</h4>
                  <p className="text-sm text-accent">{category.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;