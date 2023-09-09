package model

type Medication struct {
	med_id int64  `json:"id" db:"med_id"`
	Title  string `json:"title" db:"title"`
	Author string `json:"author" db:"author"`
}

type Patient struct {
	ID   int64  `json:"id" db:"id"`
	Name string `json:"name" db:"name"`
}
