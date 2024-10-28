package controllers

import (
	"net/http"
	"strconv"

	"github.com/Bhushan9001/Go-Rasoi/config"
	"github.com/Bhushan9001/Go-Rasoi/internal/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// func LikeComment(c *gin.Context) {

// 	var like models.Like

// 	userId, existsUserId := c.Get("userId")

// 	if !existsUserId {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "User information not found"})
// 		return
// 	}

// 	userIdFloat, ok := userId.(float64)
// 	if !ok {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
// 		return
// 	}
// 	userIdUint := uint(userIdFloat)

// 	commentIdStr := c.Param("commentId")

// 	commentIdInt, err := strconv.Atoi(commentIdStr)
// 	if err != nil {

// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid recipe ID format"})
// 		return
// 	}

// 	commentId := uint(commentIdInt)

// 	like.UserID = userIdUint
// 	like.CommentID = commentId

// 	result := config.DB.Create(&like)

// 	if result.Error != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{
// 			"message": "Error liking the comment",
// 			"error":   result.Error.Error(),
// 		})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "Liked comment!",
// 		"like":    like,
// 	})
// }

// func DisikeComment(c *gin.Context) {

// 	var like models.Like

// 	userId, existsUserId := c.Get("userId")

// 	if !existsUserId {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "User information not found"})
// 		return
// 	}

// 	userIdFloat, ok := userId.(float64)
// 	if !ok {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
// 		return
// 	}
// 	userIdUint := uint(userIdFloat)

// 	commentIdStr := c.Param("commentId")

// 	commentIdInt, err := strconv.Atoi(commentIdStr)
// 	if err != nil {

// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid recipe ID format"})
// 		return
// 	}

// 	commentId := uint(commentIdInt)

// 	result := config.DB.Where("user_id = ? AND comment_id = ?", userIdUint, commentId).Delete(&like)
// 	if result.Error != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{
// 			"message": "Error disliking the comment",
// 			"error":   result.Error.Error(),
// 		})
// 		return
// 	}

// 	if result.RowsAffected == 0 {
// 		c.JSON(http.StatusNotFound, gin.H{"message": "Like not found"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "Disliked comment!"})
// }

func LikeDislikeComment(c *gin.Context) {

	var like models.Like

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

	commentIdStr := c.Param("commentId")
	commentIdInt, err := strconv.Atoi(commentIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid comment ID format"})
		return
	}
	commentId := uint(commentIdInt)

	// Check if the like already exists
	result := config.DB.Where("user_id = ? AND comment_id = ?", userIdUint, commentId).First(&like)

	if result.Error == nil {
		// Like exists, so we remove it (dislike)
		deleteResult := config.DB.Delete(&like)
		if deleteResult.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Error disliking the comment",
				"error":   deleteResult.Error.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Disliked comment!","liked": false,})
		return
	} else if result.Error != gorm.ErrRecordNotFound {
		// Other database error
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Error checking like status",
			"error":   result.Error.Error(),
		})
		return
	}

	// Like doesn't exist, so we create it
	like = models.Like{
		UserID:    userIdUint,
		CommentID: commentId,
	}
	createResult := config.DB.Create(&like)
	if createResult.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Error liking the comment",
			"error":   createResult.Error.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Liked comment!",
		"like":    like,
		"liked": true,
	})
}
