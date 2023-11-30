package model

import (
	"fmt"
	"os"
	"time"

	"github.com/jackc/pgx"
)

func startNotificationTicker() {
	ticker := time.NewTicker(1 * time.Minute)
	done := make(chan bool)

	userId := 1

	db_url, exists := os.LookupEnv("DATABASE_URL")

	cfg := pgx.ConnConfig{
		User:     "user",
		Database: "salutemp",
		Password: "pwd",
		Host:     "localhost",
		Port:     5434,
	}
	var err error
	if exists {
		cfg, err = pgx.ParseConnectionString(db_url)

		if err != nil {
			panic(err)
		}
	}
	conn, err := pgx.Connect(cfg)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	defer conn.Close()

	body := buildNotificationBody(conn, userId)

	go func() {
		for {
			select {
			case <-done:
				return
			case t := <-ticker.C:

			}
		}
	}()
}

func buildNotificationBody(pool *pgx.Conn, userId int) (body string) {
	GetAllStoredMedsFromDBByUser(pool, userId)

	//TODO: Take all stored medications and build a notif for each that is ready to send a reminder.
}
