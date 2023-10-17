package model

type Medication struct {
	MedID  int64  `json:"id" db:"med_id"`
	Title  string `json:"title" db:"title"`
	Author string `json:"author" db:"author"`
}

type Patient struct {
	ID   int64  `json:"id" db:"id"`
	Name string `json:"name" db:"name"`
}

type CheckedOutMedication struct {
    CheckoutID         int64     `json:"checkout_id" db:"checkout_id"`
    MedID              int64     `json:"med_id" db:"med_id"`
    ID                 int64     `json:"id" db:"id"`
    ExpectedReturnDate time.Time `json:"expected_return_date" db:"expected_return_date"`
}

type Hold struct {
	HoldID          int64  `json:"holdId" db:"hold_id"`
	MedID           int64  `json:"medId" db:"med_id"`
	ID              int64  `json:"id" db:"id"`
	HoldCreationDate string `json:"holdCreationDate" db:"hold_creation_date"`
}

type LikedMedication struct {
	LikeID int64 `json:"likeId" db:"like_id"`
	MedID  int64 `json:"medId" db:"med_id"`
	ID     int64 `json:"id" db:"id"`
}





