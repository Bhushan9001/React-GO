package models

import "time"

type Like struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID    uint      `gorm:"not null;index;uniqueIndex:idx_user_comment" json:"user_id"`
	CommentID uint      `gorm:"not null;index;uniqueIndex:idx_user_comment" json:"comment_id"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
}
