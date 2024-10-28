package routes

import (
	"github.com/Bhushan9001/Go-Rasoi/internal/controllers"
	"github.com/Bhushan9001/Go-Rasoi/internal/middleware"
	"github.com/gin-gonic/gin"
)

func CommentRoutes(r *gin.Engine) {
	r.POST("/comments/reply/:commentId",middleware.AuthMiddleware(),controllers.AddReplyOnComment);
	r.POST("/comments/:recipeId", middleware.AuthMiddleware(),controllers.AddCommentOnRecipe)
	r.GET("/comments/:recipeId",controllers.GetRecipeComments);
}
