package controllers

import (
	"net/http"
	"strconv"

	"github.com/Bhushan9001/Go-Rasoi/config"
	"github.com/Bhushan9001/Go-Rasoi/internal/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AddCommentOnRecipe(c *gin.Context) {
	var comment models.Comment

	recipeIdStr := c.Param("recipeId")

	// Convert recipeIdStr to an integer
	recipeIdInt, err := strconv.Atoi(recipeIdStr)
	if err != nil {
		// Handle the conversion error if it's not a valid integer
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid recipe ID format"})
		return
	}

	// Convert the integer to uint
	recipeId := uint(recipeIdInt)

	userId, existsUserId := c.Get("userId")

	if !existsUserId {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User information not found"})
		return
	}

	userIdFloat, ok := userId.(float64)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
		return
	}
	userIdUint := uint(userIdFloat)

	comment.AuthorID = userIdUint
	comment.RecipeID = &recipeId

	if err := c.ShouldBindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid Payload!",
			"error":   err.Error(),
		})
		return
	}

	result := config.DB.Create(&comment)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Error while adding comment",
			"error":   result.Error.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "comment added successfully!!",
		"comment": comment,
	})
}

func AddReplyOnComment(c *gin.Context) {
	var reply models.Comment

	commentIdStr := c.Param("commentId")

	// Convert recipeIdStr to an integer
	commentIdInt, err := strconv.Atoi(commentIdStr)
	if err != nil {
		// Handle the conversion error if it's not a valid integer
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid recipe ID format"})
		return
	}

	// Convert the integer to uint
	commentId := uint(commentIdInt)

	userId, existsUserId := c.Get("userId")

	if !existsUserId {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User information not found"})
		return
	}

	userIdFloat, ok := userId.(float64)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
		return
	}
	userIdUint := uint(userIdFloat)

	reply.AuthorID = userIdUint
	reply.ParentID = &commentId

	if err := c.ShouldBindJSON(&reply); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid Payload!",
			"error":   err.Error(),
		})
		return
	}

	result := config.DB.Create(&reply)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Error while adding comment",
			"error":   result.Error.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "comment added successfully!!",
		"comment": reply,
	})

}

func GetRecipeComments(c *gin.Context) {
	var comments []models.Comment
	recipeIdStr := c.Param("recipeId")

	// Convert recipeIdStr to an integer
	recipeIdInt, err := strconv.Atoi(recipeIdStr)
	if err != nil {
		// Handle the conversion error if it's not a valid integer
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid recipe ID format"})
		return
	}

	// Convert the integer to uint
	recipeId := uint(recipeIdInt)

	result := config.DB.
		Preload("Replies", func(db *gorm.DB) *gorm.DB {
			return db.Preload("Author").Order("created_at ASC")
		}).
		Preload("Author").
		Find(&comments, "recipe_id = ?", recipeId)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Error while fetching comments",
			"error":   result.Error.Error(),
		})
		return
	}

	for i := range comments {
		countLikesForComment(&comments[i], recipeId);
	}

	c.JSON(http.StatusOK, gin.H{
		"message":  "Comments fetched successfully!!",
		"comments": comments,
	})

}

func countLikesForComment(comment *models.Comment, recipeID uint) {
	var count int64
	config.DB.Table("likes").
		Joins("JOIN comments ON comments.id = likes.comment_id").
		Where("likes.comment_id = ? AND comments.recipe_id = ?", comment.ID, recipeID).
		Count(&count)
	comment.LikesCount = count
}
