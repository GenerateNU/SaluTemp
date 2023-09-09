package model

import (
	"fmt"

	"github.com/jackc/pgx"
)

func WriteBookToDb(pool *pgx.Conn, book Medication) (Medication, error) {

	err := pool.QueryRow(fmt.Sprintf("INSERT INTO books (title, author) VALUES ('%s','%s') RETURNING book_id;", book.Title, book.Author)).Scan(&book.BookId)

	if err != nil {
		return Medication{}, err
	}

	return book, nil
}

func GetBookFromDB(pool *pgx.Conn, book_id int64) (Medication, error) {
	book := Medication{
		BookId: book_id,
	}

	var bid int
	err := pool.QueryRow(fmt.Sprintf("SELECT book_id, title, author FROM books where book_id = '%d';", book_id)).Scan(&bid, &book.Title, &book.Author)

	if err != nil {
		panic(err)
	}

	return book, nil
}

func GetAllBooksFromDB(pool *pgx.Conn) ([]Medication, error) {
	rows, err := pool.Query("SELECT book_id, title, author FROM books;")

	if err != nil {
		panic(err)
	}

	results := []Medication{}

	defer rows.Close()

	for rows.Next() {
		book := Medication{}
		err := rows.Scan(&book.BookId, &book.Title, &book.Author)

		if err != nil {
			panic(err)
		}

		results = append(results, book)
	}

	return results, nil
}
