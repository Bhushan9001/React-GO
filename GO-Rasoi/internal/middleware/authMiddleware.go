package middleware

import (
	"net/http"
	// "os"
	"strings"

	"github.com/Bhushan9001/Go-Rasoi/internal/utils"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		secretKey, err := utils.GetSecretKey()
		if err != nil{
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			c.Abort()
			return
		}
		if len(secretKey) == 0 {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "JWT secret key not set"})
			c.Abort()
			return
		}

		// Extract the Authorization header
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing"})
			c.Abort()
			return
		}

		if !strings.HasPrefix(authHeader, "Bearer ") {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Malformed Authorization header"})
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		// Parse and validate the token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Check the signing method is HS512
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok || token.Method != jwt.SigningMethodHS512 {
				return nil, jwt.ErrSignatureInvalid
			}
			return []byte(secretKey), nil
		})

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error":   "Invalid or expired token",
				"details": err.Error(),
			})
			c.Abort()
			return
		}

		// Extract claims if the token is valid
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			// Add user information from the token to the context
			c.Set("userName", claims["userName"])
			c.Set("userId", claims["id"])
			// Continue to the next handler
			c.Next()
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
		}
	}
}
