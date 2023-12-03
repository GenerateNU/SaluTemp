package main

import (
	"fmt"
	"os"
	"salutemp/backend/src/controller"
	"salutemp/backend/src/model"

	"github.com/jackc/pgx"
)

func main() {
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

	m := &model.PgModel{
		Conn: conn,
	}
	c := &controller.PgController{
		Model: m,
	}

	c.Serve().Run(":8081")
}
