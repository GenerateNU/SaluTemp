package controller

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v4"
)

// // Assuming dbPool is your pool of database connections
var dbPool *pgx.Conn

// User represents the user structure
type User struct {
	UserID      int    `json:"userId"`
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
	Email       string `json:"email"`
	PushToken   string `json:"pushToken,omitempty"` // Omitempty will prevent the token from being sent to the client
}

// UpdateUserToken updates the user's device token for push notifications
func UpdateUserToken(c *gin.Context) {
	var req struct {
		UserID        int    `json:"userId"`
		ExpoPushToken string `json:"expoPushToken"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	commandTag, err := dbPool.Exec(context.Background(), "UPDATE user_device SET device_id = $1 WHERE user_id = $2", req.ExpoPushToken, req.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating token"})
		return
	}
	if commandTag.RowsAffected() != 1 {
		c.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Token updated successfully"})
}

// GetUser retrieves a user record from the database by user ID
func GetUser(c *gin.Context) {
	userID := c.Param("userId")

	var user User
	err := dbPool.QueryRow(context.Background(), "SELECT user_id, first_name, last_name, email FROM user WHERE user_id = $1", userID).Scan(&user.UserID, &user.FirstName, &user.LastName, &user.Email)
	if err != nil {
		if err == pgx.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// CreateUser adds a new user to the database
func CreateUser(c *gin.Context) {
	var newUser User
	if err := c.BindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := dbPool.QueryRow(context.Background(), "INSERT INTO user (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING user_id", newUser.FirstName, newUser.LastName, newUser.Email).Scan(&newUser.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating user"})
		return
	}

	c.JSON(http.StatusCreated, newUser)
}

// DeleteUser removes a user record from the database
func DeleteUser(c *gin.Context) {
	userID := c.Param("userId")

	commandTag, err := dbPool.Exec(context.Background(), "DELETE FROM user WHERE user_id = $1", userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error deleting user"})
		return
	}
	if commandTag.RowsAffected() != 1 {
		c.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}
