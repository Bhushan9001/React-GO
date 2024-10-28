package models


type User struct {
    Id       uint       `gorm:"primaryKey;autoIncrement" json:"id"`
    Email    string     `gorm:"type:varchar(255);unique;not null" json:"email"`
    Name     string     `gorm:"type:varchar(255);not null" json:"name"`
    Password string     `gorm:"type:varchar(255);not null" json:"-"` // Omit password from JSON responses
    Recipes  []Recipe   `gorm:"foreignKey:AuthorID;constraint:OnDelete:CASCADE" json:"recipes,omitempty"`
    Comments []Comment  `gorm:"foreignKey:AuthorID;constraint:OnDelete:CASCADE" json:"comments,omitempty"`
}

