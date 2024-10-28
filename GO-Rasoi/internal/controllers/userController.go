package controllers

import (
	"fmt"
	"net/http"

	"github.com/Bhushan9001/Go-Rasoi/config"
	"github.com/Bhushan9001/Go-Rasoi/internal/models"
	"github.com/Bhushan9001/Go-Rasoi/internal/utils"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {
	var user, existingUser models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload!"})
		return
	}

	
	result := config.DB.Where("email = ?", user.Email).First(&existingUser)
	if result.RowsAffected > 0 {
		
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email already registered"})
		return
	}

	
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": "Error while hashing password"})
		return
	}

	
	user.Password = string(hashedPassword)

	
	result = config.DB.Create(&user)
	if result.Error != nil {

		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error while registering user"})
		return
	}

	
	c.JSON(http.StatusCreated, gin.H{
		"message": "Signed in Successfully!!",
		"user":    user,
	})
}

func Signin(c *gin.Context) {
	var user , existingUser models.User
	
	
	if err := c.ShouldBindJSON(&user); err != nil {
		
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload!"})
		return
	}
	fmt.Println(user)
	result := config.DB.First(&existingUser, "email = ?", user.Email)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User Not Found!!"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(user.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}
	token, err := utils.CreateToken(existingUser.Name, existingUser.Id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"err": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Signed in Successfully",
		"token":   fmt.Sprintf("Bearer %s", token),
		"user":    existingUser,
	})
}
