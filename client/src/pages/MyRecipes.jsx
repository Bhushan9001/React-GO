import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CardSkeleton from '../components/CardSkeleton';
import Card from '../components/Card';
import plus from '../assets/plus.png'
import search from '../assets/search.png'
import { IoChevronBack } from "react-icons/io5";

function MyRecipes() {


  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/addrecipe');
  }

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const random = [1, 2, 3, 4, 5, 6, 7, 8];


  useEffect(() => {
    setLoading(true);
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`/my-recipes`, {
          headers: {
            'Authorization': token
          }
        });
        if (response.data) {
          console.log(response.data.recipes)
          setRecipes(response.data.recipes);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [])
  return (
    <div className='py-5'>
      <div className='flex justify-start items-center space-x-6 md:space-x-20 px-5 md:px-0'>

        <Link to={"/"} className='flex justify-start items-center text-center pl-5 cursor-pointer'>
          <IoChevronBack size={33} color={'#228b21'} />
          <div className='text-2xl font-barlow-condensed md:flex hidden text-[#228b21]'>Back To Home</div>
        </Link>
        <div className='w-80 hidden md:flex'></div>


        <div className='text-5xl font-semibold font-barlow-condensed text-center py-5'>
          My Recipes
        </div>
      </div>

      <div className='md:flex px-6 md:px-60 items-center justify-end'>
        <div className='flex space-x-3 md:space-x-5 pt-8 ps-10'>
          <div className='text-4xl md:text-5xl font-semibold font-barlow-condensed text-[#228b21]'>Add New</div>
          <img className='w-12 h-12 md:w-16 md:h-16 animate-bounce hover:cursor-pointer' src={plus} alt='plus' onClick={handleClick} />
        </div>
      </div>

      {
        loading ? <div className='flex flex-wrap justify-center'>{random.map(() => <CardSkeleton />)}</div> :
          <div className='flex flex-wrap justify-center'>
            {
              recipes && recipes.map((recipe) => (
                <Card key={recipe.id} img={recipe.image_url} title={recipe.title} cuisine={recipe.cuisine} chef={recipe.author_name} id={recipe.id} from="MyRecipes" />

              ))
            }
          </div>
      }

    </div>
  )
}

export default MyRecipes
