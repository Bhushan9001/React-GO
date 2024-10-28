package models

import "time"

type Comment struct {
	ID            uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Text          string    `gorm:"type:text;not null" json:"text"`
	RecipeID      *uint     `gorm:"index" json:"recipe_id"` // Nullable, to allow for optional recipe relation
	Recipe        *Recipe   `gorm:"foreignKey:RecipeID" json:"recipe,omitempty"`
	AuthorID      uint      `gorm:"not null" json:"author_id"`
	Author        User      `gorm:"foreignKey:AuthorID" json:"author"`
	ParentID      *uint     `gorm:"index" json:"parent_id"` // Nullable, for replies
	ParentComment *Comment  `gorm:"foreignKey:ParentID" json:"parent_comment,omitempty"`
	Replies       []Comment `gorm:"foreignKey:ParentID;constraint:OnDelete:CASCADE" json:"replies,omitempty"`
	CreatedAt     time.Time `gorm:"autoCreateTime" json:"created_at"`
	LikesCount    int64     `gorm:"-" json:"likes_count"`
}


