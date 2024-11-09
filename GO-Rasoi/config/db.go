package config

import (
	"fmt"
	"log"
	"os"

	"github.com/Bhushan9001/Go-Rasoi/internal/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	// Load the .env file
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file: ", err)
	}

	// Get environment variables
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")

	// Construct the DSN (Data Source Name)
	// dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", dbUser, dbPassword, dbHost, dbPort, dbName)
	dsn := fmt.Sprintf("host=%v user=%v password=%v dbname=%v port=%v sslmode=require TimeZone=Asia/Kolkata",dbHost,dbUser,dbPassword,dbName,dbPort);


	// Connect to the database using GORM
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Error while connecting to the database: ", err)
	}

	// AutoMigrate the models
	if err := DB.AutoMigrate(&models.User{},&models.Recipe{} ,&models.Comment{},&models.Ingredient{},&models.Like{}); err != nil {
		log.Fatal("Error during auto migration: ", err)
	}

	fmt.Println("Database connected successfully!")
}
