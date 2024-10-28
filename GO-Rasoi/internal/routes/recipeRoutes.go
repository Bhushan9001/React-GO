package routes

import (
	"github.com/Bhushan9001/Go-Rasoi/internal/controllers"
	"github.com/Bhushan9001/Go-Rasoi/internal/middleware"
	"github.com/gin-gonic/gin"
)

func RecipeRoutes(r *gin.Engine) {
	r.POST("/recipes", middleware.AuthMiddleware(), controllers.AddRecipe);
	r.GET("/recipes",controllers.GetAllRecipes);
	r.GET("/recipes/:id",controllers.GetRecipe);
	r.GET("/my-recipes",middleware.AuthMiddleware(),controllers.UsersRecipes);
}
