package models

import (
	"time"

	"github.com/lib/pq"
)

type Recipe struct {
	ID           uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	Title        string         `gorm:"type:varchar(255);not null" json:"title"`
	Description  string         `gorm:"type:text;not null" json:"description"`
	Type         string         `gorm:"type:varchar(255);not null" json:"type"`
	Cuisine      string         `gorm:"type:varchar(255);not null" json:"cuisine"`
	Instructions pq.StringArray `gorm:"type:text[]" json:"instructions"`
	Ingredients  []Ingredient   `gorm:"foreignKey:RecipeID;constraint:OnDelete:CASCADE" json:"ingredients"`
	ImageURL     string         `gorm:"type:text;not null" json:"image_url"`
	AuthorID     uint           `gorm:"not null" json:"author_id"`
	AuthorName   string         `gorm:"type:varchar(255);not null" json:"author_name"`
	Comments     []Comment      `gorm:"foreignKey:RecipeID;constraint:OnDelete:CASCADE" json:"comments"`
	CreatedAt    time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
}

type Ingredient struct {
	ID       uint   `gorm:"primaryKey;autoIncrement" json:"id"`
	Name     string `gorm:"type:varchar(255);not null" json:"name"`
	Quantity string `gorm:"type:varchar(255);not null" json:"quantity"`
	RecipeID uint   `gorm:"not null" json:"recipe_id"`
}
