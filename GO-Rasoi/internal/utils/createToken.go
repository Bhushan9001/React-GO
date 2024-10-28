package utils

import (

	"github.com/golang-jwt/jwt/v5"
)

func CreateToken(userName string, userId uint) (string, error) {
	// Use HS512 instead of HS256
	key, err := GetSecretKey()
	if err != nil {
		return "", err
	}
	secretKey := []byte(key)
	token := jwt.NewWithClaims(jwt.SigningMethodHS512,
		jwt.MapClaims{
			"userName": userName,
			"id":       userId,
			// "exp":      time.Now().Add(time.Hour * 24).Unix(), // Token expiration set to 24 hours
		})

	// Generate the token string with the secret key
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
