package controllers

import (
	"encoding/base64"
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"strings"
	"time"

	"github.com/Bhushan9001/Go-Rasoi/config"
	"github.com/Bhushan9001/Go-Rasoi/internal/models"
	"github.com/gin-gonic/gin"
)

func FormatBase64Img(img *multipart.FileHeader) (string, error) {

	openImg, err := img.Open()

	if err != nil {
		return "", err
	}

	defer openImg.Close()

	imgBytes, err := io.ReadAll(openImg)
	if err != nil {
		return "", err
	}
	//
	var mimeType string
	switch strings.ToLower(img.Filename[strings.LastIndex(img.Filename, ".")+1:]) {
	case "jpg", "jpeg":
		mimeType = "image/jpeg"
	case "png":
		mimeType = "image/png"
	case "gif":
		mimeType = "image/gif"
	default:
		return "", errors.New("unsupported file type")
	}
	base64Image := base64.StdEncoding.EncodeToString(imgBytes)

	return "data:" + mimeType + ";base64," + base64Image, nil
}

func AddRecipe(c *gin.Context) {

	title := c.PostForm("title")
	description := c.PostForm("description")
	recipeType := c.PostForm("type")
	cuisine := c.PostForm("cuisine")
	instructions := c.PostFormArray("instructions[]")

	// Parse ingredients
	var ingredients []models.Ingredient
	for i := 0; ; i++ {
		name := c.PostForm(fmt.Sprintf("ingredients[%d][name]", i))
		quantity := c.PostForm(fmt.Sprintf("ingredients[%d][quantity]", i))

		if name == "" || quantity == "" {
			break // Stop when there are no more ingredients
		}

		ingredient := models.Ingredient{
			Name:     name,
			Quantity: quantity,
		}

		ingredients = append(ingredients, ingredient)
	}

	// Debug prints
	// fmt.Printf("Title: %s\nDescription: %s\nType: %s\nCuisine: %s\n", title, description, recipeType, cuisine)
	// fmt.Printf("Instructions: %v\n", instructions)
	// fmt.Printf("Ingredients: %v\n", ingredients)
	userName, existsUserName := c.Get("userName")
	userId, existsUserId := c.Get("userId")

	if !existsUserName || !existsUserId {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User information not found"})
		return
	}

	userIdFloat, ok := userId.(float64)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
		return
	}
	userIdUint := uint(userIdFloat)

	img, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"File upload error": err})
		return

	}

	base64String, err := FormatBase64Img(img)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"img conversion error": err.Error()})
		return
	}

	recipe := models.Recipe{
		Title:        title,
		Description:  description,
		Type:         recipeType,
		Cuisine:      cuisine,
		Instructions: instructions,
		Ingredients:  ingredients,
		ImageURL:     base64String,
		AuthorID:     userIdUint,
		AuthorName:   userName.(string),
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}
	fmt.Println("recipes instructions", recipe.Instructions)
	result := config.DB.Create(&recipe)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add recipe", "desc": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Recipe Added Successfully",
		"recipe":  recipe,
	})
}

func GetAllRecipes(c *gin.Context) {
	var recipes []models.Recipe

	result := config.DB.Preload("Ingredients").Find(&recipes)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get recipe", "desc": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Recipes fetched Successfully",
		"recipes": recipes,
	})
}

func GetRecipe(c *gin.Context) {
	var recipe models.Recipe
	id := c.Param("id")
	result := config.DB.Preload("Ingredients").Preload("Comments").First(&recipe, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get recipe", "desc": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Recipe fetched Successfully",
		"recipe":  recipe,
	})
}

func UsersRecipes(c *gin.Context) {
	var recipes []models.Recipe
	userId, existsUserId := c.Get("userId")
	if !existsUserId {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User information not found"})
		return
	}
	result := config.DB.Preload("Ingredients").Find(&recipes, "author_id  = ?", userId)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get recipe", "desc": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Recipes fetched Successfully",
		"recipes": recipes,
	})
}


