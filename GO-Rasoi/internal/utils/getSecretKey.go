package utils

import (
	"errors"
	"os"
)

func GetSecretKey() (string, error) {
	key := os.Getenv("JWT_SECRET")

	// Check if the environment variable is empty
	if key == "" {
		return "", errors.New("JWT_SECRET environment variable not set")
	}

	return key, nil
}
