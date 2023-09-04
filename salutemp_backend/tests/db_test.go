package tests

import (
	"database/sql"
	"fmt"
	"testing"

	_ "github.com/lib/pq"
)

func TestDBConnection(t *testing.T) {
	dbURL := fmt.Sprintf("postgres://%s:%s@localhost:5433/%s?sslmode=disable",
		"user",
		"pwd",
		"bootcamp",
	)

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		t.Fatalf("failed to connect to the database: %v", err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		t.Fatalf("failed to ping the database: %v", err)
	}
}
