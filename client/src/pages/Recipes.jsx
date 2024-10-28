import React, { Suspense, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import axios from 'axios';
import plus from '../assets/plus.png';
import search from '../assets/search.png';
import { IoChevronBack } from "react-icons/io5";
import CardSkeleton from '../components/CardSkeleton';

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const random = Array.from({ length: 8 });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
  };

  const handleClick = () => {
    navigate('/addrecipe');
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/recipes`);
        if (response.data?.recipes?.length) {
          setRecipes(response.data.recipes);
        } else {
          setError('No recipes found.');
        }
      } catch (err) {
        setError('Failed to load recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    (recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.author_name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCuisine ? recipe.cuisine.toLowerCase() === selectedCuisine.toLowerCase() : true)
  );

  return (
    <div className="py-5 mx-4 md:mx-16 lg:mx-24 pt-10">
      <header className="flex justify-between items-center space-x-5 md:space-x-10 mb-5">
        <Link to="/" className="flex items-center text-[#228b21]">
          <IoChevronBack size={33} />
          <span className="text-2xl font-semibold hidden md:inline">Back To Home</span>
        </Link>
        <h1 className="text-3xl md:text-5xl font-semibold text-center font-barlow-condensed">Delicious Discoveries</h1>
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-semibold text-[#228b21]">Add Yours</span>
          <img
            src={plus}
            alt="Add Recipe"
            className="w-12 h-12 md:w-16 md:h-16 animate-bounce cursor-pointer"
            onClick={handleClick}
          />
        </div>
      </header>

      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mb-8 pt-5">
        <div className="relative flex items-center border-2 border-[#4fd64d] rounded-md w-full md:w-1/2 h-10 px-4">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full text-lg font-barlow-condensed focus:outline-none"
            value={searchQuery}
            onChange={handleSearch}
          />
          <img src={search} alt="Search icon" className="w-6 h-6" />
        </div>

        <select
          className="block w-full md:w-auto px-4 py-3 text-lg font-barlow-condensed bg-transparent border-b-2 border-[#4fd64d] focus:outline-none"
          value={selectedCuisine}
          onChange={handleCuisineChange}
        >
          <option value="">Choose Cuisine</option>
          <option value="Indian">Indian</option>
          <option value="Italian">Italian</option>
          <option value="French">French</option>
          <option value="Chinese">Chinese</option>
        </select>
      </div>

      {error ? (
        <div className="text-center text-2xl text-red-500 py-5">{error}</div>
      ) : loading ? (
        <div className="flex flex-wrap justify-center gap-4">
          {random.map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                img={recipe.image_url}
                title={recipe.title}
                cuisine={recipe.cuisine}
                chef={recipe.author_name}
                id={recipe.id}
              />
            ))
          ) : (
            <div className="text-center text-xl py-5">No recipes found matching your search.</div>
          )}
        </div>
      )}
    </div>
  );
};


export default Recipes;
