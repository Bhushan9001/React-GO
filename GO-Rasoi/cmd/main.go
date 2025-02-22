package main

import (
	"fmt"
	"time"

	"github.com/Bhushan9001/Go-Rasoi/config"
	"github.com/Bhushan9001/Go-Rasoi/internal/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	config.ConnectDB()
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Replace with your frontend origin
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	routes.UserRoutes(r)
	routes.RecipeRoutes(r)
	routes.CommentRoutes(r)
	routes.LikeRoutes(r)

	r.Static("/assets", "build/assets")
	r.StaticFile("/", "build/index.html")
	r.NoRoute(func(c *gin.Context) {
		c.File("build/index.html")
	})

	if err := r.Run(":3000"); err != nil {
		fmt.Printf("Failed to run the server: %v\n", err)
	}
	fmt.Printf("\n[server]:- http://localhost:3000")
}
