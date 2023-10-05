package controller

import (
	"net/http"
	"salutemp/backend/src/model"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"fmt"

)

type Controller interface {
	Serve() *gin.Engine
}

type PgController struct {
	model.Model
}

func (pg *PgController) Serve() *gin.Engine {
	r := gin.Default()

	r.Use(cors.Default())
	r.GET("/v1/medications/:medID", func(c *gin.Context) {
		id := c.Param("medID")
		intId, err := strconv.Atoi(id)

		if err != nil {
			panic(err)
		}
		c.JSON(http.StatusOK, pg.Medication(int64(intId)))
	})


	r.GET("/v1/medications/", func(c *gin.Context) {
		meds, err := pg.AllMedications()
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Oops")
		}
		c.JSON(http.StatusOK, meds)
	})

	r.POST("/v1/addmedications", func(c *gin.Context) {
		var med model.Medication
		fmt.Println("Hello, ")
		fmt.Println(med)

		if err := c.BindJSON(&med); err != nil {
			c.JSON(http.StatusBadRequest, "Failed to unmarshal medication")
			return
		}
		fmt.Println("Bye, ")

		fmt.Println(med)



		insertedMed, err := pg.AddMedication(med)
		fmt.Println(insertedMed)
		fmt.Println(err)


		if err != nil {
			c.JSON(http.StatusBadRequest, "Failed to add a medication")
			panic(err)
		}

		c.JSON(http.StatusOK, insertedMed)
	})

	r.DELETE("/v1/medications/:medID", func(c *gin.Context) {
		id := c.Param("medID")
		intID, err := strconv.Atoi(id)
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid medID")
			return
		}
	
		err = pg.DeleteMedication(int64(intID))
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Failed to delete medication")
			return
		}
	
		c.JSON(http.StatusOK, "Medication deleted successfully")
	})
	


	r.PUT("/v1/medications/:medID", func(c *gin.Context) {
		var med model.Medication
	
		if err := c.BindJSON(&med); err != nil {
			c.JSON(http.StatusBadRequest, "Failed to unmarshal medication")
			return
		}
	
		id := c.Param("medID")
		intID, err := strconv.Atoi(id)
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid medID")
			return
		}
	
		med.MedID = int64(intID)
	
		err = pg.EditMedication(med)
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Failed to edit medication")
			return
		}
	
		c.JSON(http.StatusOK, "Medication edited successfully")
	})


	//patient routes

	r.GET("/v1/patients/:id", func(c *gin.Context) {
        id := c.Param("id")
        intID, err := strconv.Atoi(id)

        if err != nil {
            c.JSON(http.StatusBadRequest, "Invalid ID")
            return
        }
        c.JSON(http.StatusOK, pg.Patient(int64(intID)))
    })

    r.GET("/v1/patients/", func(c *gin.Context) {
        patients, err := pg.AllPatients()
        if err != nil {
            c.JSON(http.StatusInternalServerError, "Oops")
        }
        c.JSON(http.StatusOK, patients)
    })

    r.POST("/v1/addpatients", func(c *gin.Context) {
        var patient model.Patient

        if err := c.BindJSON(&patient); err != nil {
            c.JSON(http.StatusBadRequest, "Failed to unmarshal patient")
            return
        }

        insertedPatient, err := pg.AddPatient(patient)

        if err != nil {
            c.JSON(http.StatusBadRequest, "Failed to add a patient")
            panic(err)
        }

        c.JSON(http.StatusOK, insertedPatient)
    })


	r.DELETE("/v1/patients/:id", func(c *gin.Context) {
		id := c.Param("id")
		intID, err := strconv.Atoi(id)
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid ID")
			return
		}
	
		err = pg.DeletePatient(int64(intID))
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Failed to delete patient")
			return
		}
	
		c.JSON(http.StatusOK, "Patient deleted successfully")
	})
	
	r.PUT("/v1/patients/:id", func(c *gin.Context) {
		var user model.Patient
	
		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, "Failed to unmarshal user")
			return
		}
	
		id := c.Param("id")
		intID, err := strconv.Atoi(id)
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid ID")
			return
		}
	
		user.ID = int64(intID)
	
		err = pg.EditPatient(user)
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Failed to edit user")
			return
		}
	
		c.JSON(http.StatusOK, "User edited successfully")
	})
	
	

	return r
}
