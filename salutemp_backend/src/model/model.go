package model

import (
	"github.com/jackc/pgx"
)

type PgModel struct {
	Conn *pgx.Conn
}

type Model interface {
	Book(int64) Medication
	AllBooks() ([]Medication, error)
	AddBook(Medication) (Medication, error)
}

func (m *PgModel) Book(id int64) Medication {
	book, err := GetBookFromDB(m.Conn, id)

	if err != nil {
		panic(err)
	}

	return book
}

func (m *PgModel) AddBook(book Medication) (Medication, error) {
	b, err := WriteBookToDb(m.Conn, book)

	if err != nil {
		return Medication{}, err
	}

	return b, nil
}

func (m *PgModel) AllBooks() ([]Medication, error) {
	books, err := GetAllBooksFromDB(m.Conn)

	if err != nil {
		return []Medication{}, err
	}
	return books, nil
}
