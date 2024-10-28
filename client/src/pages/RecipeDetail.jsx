import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { IoChevronBack } from "react-icons/io5";
import boy from "../assets/boy.png";
import CommentComp from "../components/CommentComp";

import { userAtom } from "../atoms/userAtom";
import Avatar from "../components/Avatar";
import {
  WhatsappShareButton,
  FacebookShareButton,
  WhatsappIcon,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import DetailsSkeleton from "../components/DetailsSkeleton";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeDetail = () => {
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  
  const title = `${recipe.title} Recipe`;
  const url = `${import.meta.env.VITE_BACKEND}/recipes/${recipe.id}`;

 

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/recipes/${id}`
      );
      setRecipe(response.data.recipe);
      console.log(response.data.recipe)
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
    setLoading(false);
  };

  const calculateDaysSinceCreated = (createdDate) => {
    const created = new Date(createdDate);
    const now = new Date();
    return Math.floor((now - created) / (1000 * 3600 * 24));
  };

  const daysSinceCreated = recipe.created_at
    ? calculateDaysSinceCreated(recipe.created_at)
    : null;

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <ToastContainer transition={Bounce} />
      <Link
        to={"/recipes"}
        className="flex items-center pl-5 pt-7 text-[#37a837] hover:text-[#2a872a] transition-colors duration-200 cursor-pointer"
      >
        <IoChevronBack size={30} />
        <span className="text-xl font-semibold ml-2 hidden md:inline-block">
          Back To Recipes
        </span>
      </Link>

      {loading ? (
        <DetailsSkeleton />
      ) : (
        <div className="flex flex-col md:flex-row w-full p-4 gap-6">
          {/* Recipe Image and Description */}
          <div className="w-full md:w-1/3 px-4 space-y-6">
            <h1 className="text-4xl font-bold text-[#2a872a]">
              {recipe.title}
            </h1>
            <div className="text-lg text-gray-600 space-y-2">
              <p>
                Cuisine:{" "}
                <span className="font-semibold text-[#428C41]">
                  {recipe.cuisine}
                </span>
              </p>
              <p>
                Type:{" "}
                <span className="font-semibold text-[#428C41]">
                  {recipe.type}
                </span>
              </p>
            </div>
            <p className="text-lg text-gray-700">{recipe.description}</p>
            <img
              className="w-full h-auto rounded-lg shadow-md"
              src={recipe.image_url}
              alt={recipe.title}
            />
          </div>

          {/* Ingredients and Instructions */}
          <div className="w-full md:w-2/3 px-4 space-y-10">
            <section>
              <h2 className="text-3xl font-semibold text-[#2a872a]">
                Ingredients
              </h2>
              <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse text-lg text-gray-800">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-3 text-left">Name</th>
                      <th className="border p-3 text-left">Quantity</th>
                      <th className="border p-3 text-left">Name</th>
                      <th className="border p-3 text-left">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipe.ingredients
                      ?.reduce((rows, ingredient, index) => {
                        if (index % 2 === 0) rows.push([]);
                        rows[rows.length - 1].push(ingredient);
                        return rows;
                      }, [])
                      .map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="bg-white even:bg-gray-100"
                        >
                          {row.map((ingredient, colIndex) => (
                            <React.Fragment key={colIndex}>
                              <td className="border p-3">{ingredient.name}</td>
                              <td className="border p-3">
                                {ingredient.quantity}
                              </td>
                            </React.Fragment>
                          ))}
                          {row.length < 2 && (
                            <>
                              <td className="border p-3"></td>
                              <td className="border p-3"></td>
                            </>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-[#2a872a]">
                Instructions
              </h2>
              <ol className="list-decimal pl-8 mt-4 space-y-4 text-lg text-gray-700">
                {recipe.instructions?.map((inst, idx) => (
                  <li key={idx}>{inst}</li>
                ))}
              </ol>
            </section>

            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center bg-[#37a837] text-white px-6 py-3 rounded-full space-x-4">
                <span>Share with friends</span>
                {!flag ? (
                  <PiPaperPlaneTiltFill
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setFlag(true)}
                  />
                ) : (
                  <>
                    <WhatsappShareButton title={title} url={url}>
                      <WhatsappIcon size={30} round />
                    </WhatsappShareButton>
                    <FacebookShareButton url={url} quote={title}>
                      <FacebookIcon size={30} round />
                    </FacebookShareButton>
                    <LinkedinShareButton url={url} quote={title}>
                      <LinkedinIcon size={30} round />
                    </LinkedinShareButton>
                    <TelegramShareButton url={url} quote={title}>
                      <TelegramIcon size={30} round />
                    </TelegramShareButton>
                  </>
                )}
              </div>
              <div className="text-gray-500 italic">
                <p>By {recipe.author_name}</p>
                <p>{daysSinceCreated} days ago</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {recipe.id && <CommentComp recipeId={recipe.id}/>}
      
    </>
  );
};

export default RecipeDetail;
