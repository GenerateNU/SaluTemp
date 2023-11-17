package controller

import (
	"context"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v4"
)

// Assuming dbPool is your pool of database connections
var dbPool *pgx.Conn

// Reminder represents the structure for a medication reminder
type Reminder struct {
	ReminderID        int    `json:"reminderId"`
	StoredMedicationID int    `json:"storedMedicationId"`
	Schedule          string `json:"schedule"`
}

// SetReminder - Creates a new reminder
func SetReminder(c *gin.Context) {
	var reminder Reminder
	if err := c.BindJSON(&reminder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var newReminderID int
	err := dbPool.QueryRow(context.Background(), "INSERT INTO reminders (stored_medication_id, schedule) VALUES ($1, $2) RETURNING reminder_id", reminder.StoredMedicationID, reminder.Schedule).Scan(&newReminderID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error setting reminder"})
		return
	}

	reminder.ReminderID = newReminderID
	c.JSON(http.StatusCreated, reminder)
}

// RemoveReminder - Deletes an existing reminder
func RemoveReminder(c *gin.Context) {
	reminderID, err := strconv.Atoi(c.Param("reminderId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid reminder ID"})
		return
	}

	commandTag, err := dbPool.Exec(context.Background(), "DELETE FROM reminders WHERE reminder_id = $1", reminderID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error removing reminder"})
		return
	}
	if commandTag.RowsAffected() != 1 {
		c.JSON(http.StatusNotFound, gin.H{"message": "Reminder not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Reminder removed successfully"})
}

// GetReminders - Retrieves all reminders due up to the current time
func GetReminders(c *gin.Context) {
	rows, err := dbPool.Query(context.Background(), "SELECT reminder_id, stored_medication_id, schedule FROM reminders WHERE schedule <= NOW()")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching reminders"})
		return
	}
	defer rows.Close()

	var reminders []Reminder
	for rows.Next() {
		var r Reminder
		if err := rows.Scan(&r.ReminderID, &r.StoredMedicationID, &r.Schedule); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error scanning reminders"})
			return
		}
		reminders = append(reminders, r)
	}

	if err = rows.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error iterating through reminders"})
		return
	}

	c.JSON(http.StatusOK, reminders)
}

// UpdateReminder - Updates an existing reminder's schedule
func UpdateReminder(c *gin.Context) {
	var reminder Reminder
	reminderID, err := strconv.Atoi(c.Param("reminderId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid reminder ID"})
		return
	}

	if err := c.BindJSON(&reminder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	commandTag, err := dbPool.Exec(context.Background(), "UPDATE reminders SET schedule = $1 WHERE reminder_id = $2", reminder.Schedule, reminderID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating reminder"})
		return
	}
	if commandTag.RowsAffected() != 1 {
		c.JSON(http.StatusNotFound, gin.H{"message": "Reminder not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Reminder updated successfully"})
}
