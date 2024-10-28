package routes

import (
	"github.com/Bhushan9001/Go-Rasoi/internal/controllers"
	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.Engine) {

	r.POST("/users/signup", controllers.Signup);
	r.POST("/users/login", controllers.Signin);
}
