package routes

import (
	"github.com/Bhushan9001/Go-Rasoi/internal/controllers"
	"github.com/Bhushan9001/Go-Rasoi/internal/middleware"
	"github.com/gin-gonic/gin"
)

func LikeRoutes(r *gin.Engine){

	// r.POST("/comments/like/:commentId",middleware.AuthMiddleware(),controllers.LikeComment);
	// r.POST("/comments/dis-like/:commentId",middleware.AuthMiddleware(),controllers.DisikeComment);
	r.POST("/comments/like-dislike/:commentId",middleware.AuthMiddleware(),controllers.LikeDislikeComment);
		
}