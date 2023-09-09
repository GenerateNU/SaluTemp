package controller

import (
	"net/http"
	"salutemp/backend/src/model"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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

		if err := c.BindJSON(&med); err != nil {
			c.JSON(http.StatusBadRequest, "Failed to unmarshal medication")
			return
		}

		insertedMed, err := pg.AddMedication(med)

		if err != nil {
			c.JSON(http.StatusBadRequest, "Failed to add a medication")
			panic(err)
		}

		c.JSON(http.StatusOK, insertedMed)
	})

	return r
}
