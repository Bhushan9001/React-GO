import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import RecipeDetail from "./pages/RecipeDetail";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Recipes from "./pages/Recipes";
import AddRecipe from "./pages/AddRecipe";
import { RecoilRoot } from "recoil";
import MyRecipes from "./pages/MyRecipes";

const App = ()=>{
  console.log();
  return(
    
       <Routes>
       <Route path="/" element={<HomePage/>}/>
       <Route path="/all-recipes/:id" element={<RecipeDetail/>}/>
       <Route path="/all-recipes/" element={<Recipes/>}/>
       <Route path="/signup" element={<Signup/>}/>
       <Route path="/signin" element={<Signin/>}/>
       <Route path="/addrecipe" element={<AddRecipe/>}/>
       <Route path="/myRecipes" element={<MyRecipes/>}/>
     </Routes>   
    
  )
}

export default App;