package controller

import (
	"net/http"
	"salutemp/backend/src/model"
	"strconv"

	"fmt"
	"time"

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
		c.JSON(http.StatusOK, pg.Medication(intId))
	})

	r.GET("/v1/medications/", func(c *gin.Context) {
		meds, err := pg.AllMedications()
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Oops")
			return
		}
		c.JSON(http.StatusOK, meds)
	})

	r.POST("/v1/addmedications", func(c *gin.Context) {
		var med model.Medication

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
	
		err = pg.DeleteMedication(intID)
	
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
	
		med.MedicationID = intID
	

		err = pg.EditMedication(med)

		if err != nil {
			c.JSON(http.StatusInternalServerError, "Failed to edit medication")
			return
		}

		c.JSON(http.StatusOK, "Medication edited successfully")
	})

	//user routes

	r.GET("/v1/users/:id", func(c *gin.Context) {
        id := c.Param("id")
        intID, err := strconv.Atoi(id)

        if err != nil {
            c.JSON(http.StatusBadRequest, "Invalid ID")
            return
        }
        c.JSON(http.StatusOK, pg.User(int(intID)))
    })

    r.GET("/v1/users/", func(c *gin.Context) {
        patients, err := pg.AllUsers()
        if err != nil {
            c.JSON(http.StatusInternalServerError, "Oops")
			return
        }
        c.JSON(http.StatusOK, patients)
    })

    r.POST("/v1/addusers", func(c *gin.Context) {
        var patient model.User

        if err := c.BindJSON(&patient); err != nil {
            c.JSON(http.StatusBadRequest, "Failed to unmarshal user")
            return
        }

        insertedPatient, err := pg.AddUser(patient)

        if err != nil {
            c.JSON(http.StatusBadRequest, "Failed to add a user")
            panic(err)
        }

		if err != nil {
			c.JSON(http.StatusBadRequest, "Failed to add a patient")
			panic(err)
		}

		c.JSON(http.StatusOK, insertedPatient)
	})

	r.DELETE("/v1/users/:id", func(c *gin.Context) {
		id := c.Param("id")
		intID, err := strconv.Atoi(id)

		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid ID")
			return
		}
	
		err = pg.DeleteUser(int(intID))
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Failed to delete user")
			return
		}
	
		c.JSON(http.StatusOK, "User deleted successfully")
	})
	
	r.PUT("/v1/users/:id", func(c *gin.Context) {
		var user model.User
	

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
	
		user.UserID= int(intID)
	
		err = pg.EditUser(user)
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Failed to edit user")
			return
		}

		c.JSON(http.StatusOK, "User edited successfully")
	})

	//user devices
	// user device routes

r.GET("/v1/userdevices/:id", func(c *gin.Context) {
    id := c.Param("id")
    intID, err := strconv.Atoi(id)

    if err != nil {
        c.JSON(http.StatusBadRequest, "Invalid ID")
        return
    }
    c.JSON(http.StatusOK, pg.UserDevice(int(intID)))
})

r.GET("/v1/userdevices/", func(c *gin.Context) {
    userDevices, err := pg.AllUserDevices()
    if err != nil {
        c.JSON(http.StatusInternalServerError, "Oops")
        return
    }
    c.JSON(http.StatusOK, userDevices)
})

r.POST("/v1/adduserdevices", func(c *gin.Context) {
    var userDevice model.UserDevice

    if err := c.BindJSON(&userDevice); err != nil {
        c.JSON(http.StatusBadRequest, "Failed to unmarshal user device")
        return
    }

    insertedUserDevice, err := pg.AddUserDevice(userDevice)

    if err != nil {
        c.JSON(http.StatusBadRequest, "Failed to add a user device")
        panic(err)
    }

    c.JSON(http.StatusOK, insertedUserDevice)
})

r.DELETE("/v1/userdevices/:id", func(c *gin.Context) {
    id := c.Param("id")
    intID, err := strconv.Atoi(id)

    if err != nil {
        c.JSON(http.StatusBadRequest, "Invalid ID")
        return
    }

    err = pg.DeleteUserDevice(int(intID))

    if err != nil {
        c.JSON(http.StatusInternalServerError, "Failed to delete user device")
        return
    }

    c.JSON(http.StatusOK, "User device deleted successfully")
})


r.PUT("/v1/userdevices/:id", func(c *gin.Context) {
    var userDevice model.UserDevice

    if err := c.BindJSON(&userDevice); err != nil {
        c.JSON(http.StatusBadRequest, "Failed to unmarshal user device")
        return
    }

    id := c.Param("id")
    intID, err := strconv.Atoi(id)

    if err != nil {
        c.JSON(http.StatusBadRequest, "Invalid ID")
        return
    }

    userDevice.UserDeviceID = int(intID)

    err = pg.EditUserDevice(userDevice)

    if err != nil {
        c.JSON(http.StatusInternalServerError, "Failed to edit user device")
        return
    }

    c.JSON(http.StatusOK, "User device edited successfully")
})

   


	//stored medication routes

	r.GET("/v1/storedmedications/:id", func(c *gin.Context) {
		id := c.Param("id")
		intID, err := strconv.Atoi(id)
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid ID")
			return
		}
	
		storedMedication, err := pg.StoredMedication(intID)
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Oops")
			return
		}
	
		c.JSON(http.StatusOK, storedMedication)
	})
	
	r.GET("/v1/storedmedications/", func(c *gin.Context) {
		storedMedications, err := pg.AllStoredMedications()
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Oops")
			return
		}
	
		c.JSON(http.StatusOK, storedMedications)
	})
	
	r.POST("/v1/addstoredmedications", func(c *gin.Context) {
		var storedMedication model.StoredMedication
	
		if err := c.BindJSON(&storedMedication); err != nil {
			c.JSON(http.StatusBadRequest, "Failed to unmarshal stored medication")
			return
		}
	
		insertedMedication, err := pg.AddStoredMedication(storedMedication)
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Failed to add stored medication")
			panic(err)
		}
	
		c.JSON(http.StatusOK, insertedMedication)
	})
	
	r.DELETE("/v1/storedmedications/:id", func(c *gin.Context) {
		id := c.Param("id")
		intID, err := strconv.Atoi(id)
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid ID")
			return
		}
	
		err = pg.DeleteStoredMedication(int(intID))
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Failed to delete stored medication")
			return
		}
	
		c.JSON(http.StatusOK, "Stored medication deleted successfully")
	})
	
	r.PUT("/v1/storedmedications/:id", func(c *gin.Context) {
		var storedMedication model.StoredMedication
	
		if err := c.BindJSON(&storedMedication); err != nil {
			c.JSON(http.StatusBadRequest, "Failed to unmarshal stored medication")
			return
		}
	
		id := c.Param("id")
		intID, err := strconv.Atoi(id)
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid ID")
			return
		}
	
		storedMedication.StoredMedicationID = int(intID)
	
		err = pg.EditStoredMedication(storedMedication)
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Failed to edit stored medication")
			return
		}
	
		c.JSON(http.StatusOK, "Stored medication edited successfully")
	})

	//alerts

	r.GET("/v1/alerts/:id", func(c *gin.Context) {
		id := c.Param("id")
		intID, err := strconv.Atoi(id)
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid ID")
			return
		}
	
		alert,err2 := pg.Alert(intID)

		if err2 !=nil{
			c.JSON(http.StatusBadRequest, "Invalid Alert")
			return
		}
	
		c.JSON(http.StatusOK, alert)
	})
	
	r.GET("/v1/alerts/", func(c *gin.Context) {
		alerts, err := pg.AllAlerts()
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Oops")
			return
		}
	
		c.JSON(http.StatusOK, alerts)
	})
	
	r.POST("/v1/addalerts", func(c *gin.Context) {
		var alert model.Alert
	
		if err := c.BindJSON(&alert); err != nil {
			c.JSON(http.StatusBadRequest, "Failed to unmarshal alert")
			return
		}
	
		addedAlert, err := pg.AddAlert(alert)
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Failed to add alert")
			panic(err)
		}
	
		c.JSON(http.StatusOK, addedAlert)
	})
	
	r.DELETE("/v1/alerts/:id", func(c *gin.Context) {
		id := c.Param("id")
		intID, err := strconv.Atoi(id)
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid ID")
			return
		}
	
		err = pg.DeleteAlert(int(intID))
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Failed to delete alert")
			return
		}
	
		c.JSON(http.StatusOK, "Alert deleted successfully")
	})
	
	r.PUT("/v1/alerts/:id", func(c *gin.Context) {
		var alert model.Alert
	
		if err := c.BindJSON(&alert); err != nil {
			c.JSON(http.StatusBadRequest, "Failed to unmarshal alert")
			return
		}
	
		id := c.Param("id")
		intID, err := strconv.Atoi(id)
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid ID")
			return
		}
	
		alert.WarningID = int(intID)
	
		err = pg.EditAlert(alert)
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Failed to edit alert")
			return
		}
	
		c.JSON(http.StatusOK, "Alert edited successfully")
	})

	r.GET("/v1/statusreports/:eventtime/:storedmedicationid", func(c *gin.Context) {
		eventTimeString := c.Param("eventtime")
		storedMedicationIDStr := c.Param("storedmedicationid")
		storedMedicationID, err := strconv.Atoi(storedMedicationIDStr)
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid event time or stored medication ID")
			return
		}
	
		eventTime, err := time.Parse(time.RFC3339, eventTimeString)

		event, err := pg.StatusReport(eventTime, storedMedicationID)
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Oops")
			return
		}
	
		c.JSON(http.StatusOK, event)
	})
	
	
	r.GET("/v1/statusreports/", func(c *gin.Context) {
		events, err := pg.AllStatusReports()
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Oops")
			return
		}
	
		c.JSON(http.StatusOK, events)
	})
	
	r.POST("/v1/addstatusreports", func(c *gin.Context) {
		var event model.StatusReport
	
		if err := c.BindJSON(&event); err != nil {
			c.JSON(http.StatusBadRequest, "Failed to unmarshal condition event")
			return
		}
	
		_,err := pg.AddStatusReport(event)
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Failed to add condition event")
			panic(err)
		}
	
		c.JSON(http.StatusOK, "Condition event added successfully")
	})
	
	r.DELETE("/v1/statusreports/:eventtime/:storedmedicationid", func(c *gin.Context) {
		eventTimeString := c.Param("eventtime")
		storedMedicationIDStr := c.Param("storedmedicationid")
		storedMedicationID, err := strconv.Atoi(storedMedicationIDStr)	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid event time or stored medication ID")
			return
		}

		eventTime, err := time.Parse(time.RFC3339, eventTimeString)

	
		err = pg.DeleteStatusReport(eventTime, storedMedicationID)
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Failed to delete condition event")
			return
		}
	
		c.JSON(http.StatusOK, "Condition event deleted successfully")
	})
	
r.PUT("/v1/statusreports/:eventtime/:storedmedicationid", func(c *gin.Context) {
    eventTimeParam := c.Param("eventtime")
    storedMedicationIDParam := c.Param("storedmedicationid")

    eventTime, err := time.Parse(time.RFC3339, eventTimeParam)
    if err != nil {
        c.JSON(http.StatusBadRequest, "Invalid event time format")
        return
    }

    storedMedicationID, err := strconv.Atoi(storedMedicationIDParam)
    if err != nil {
        c.JSON(http.StatusBadRequest, "Invalid stored medication ID")
        return
    }

    var event model.StatusReport
    if err := c.BindJSON(&event); err != nil {
        c.JSON(http.StatusBadRequest, "Failed to unmarshal status report")
        return
    }

    event.EventTime = eventTime
    event.StoredMedicationID = storedMedicationID

    // Call the function to edit the status report in the database using eventTime and storedMedicationID
    err = pg.EditStatusReport(event)
    if err != nil {
        c.JSON(http.StatusInternalServerError, "Failed to edit status report")
        return
    }

    c.JSON(http.StatusOK, "Status report edited successfully")
})

	
	
	r.GET("/v1/medicationconstraints/:medicationid/:conditiontype", func(c *gin.Context) {
		medicationIDStr := c.Param("medicationid")
		medicationID, err := strconv.Atoi(medicationIDStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid medication ID")
			return
		}
		
		conditionType := c.Param("conditiontype")
		
		constraint, err := pg.MedicationConstraint(medicationID, conditionType)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Oops")
			return
		}
		
		c.JSON(http.StatusOK, constraint)
	})
	
	
	r.GET("/v1/medicationconstraints/", func(c *gin.Context) {
		constraints, err := pg.AllMedicationConstraints()
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Oops")
			panic(err)
		}
	
		c.JSON(http.StatusOK, constraints)
	})
	
	r.POST("/v1/addmedicationconstraints", func(c *gin.Context) {
		var constraint model.MedicationConstraint
	
		if err := c.BindJSON(&constraint); err != nil {
			c.JSON(http.StatusBadRequest, "Failed to unmarshal medication constraint")
			return
		}
	
		_,err := pg.AddMedicationConstraint(constraint)
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Failed to add medication constraint")
			panic(err)
		}
	
		c.JSON(http.StatusOK, "Medication constraint added successfully")
	})
	
	r.DELETE("/v1/medicationconstraints/:medicationid/:conditiontype", func(c *gin.Context) {
		medicationIDStr := c.Param("medicationid")
		medicationID, err := strconv.Atoi(medicationIDStr)
		
		conditionType := c.Param("conditiontype")
	
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid medication ID")
			return
		}
	
		err = pg.DeleteMedicationConstraint(medicationID, conditionType)
	
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Failed to delete medication constraint")
			return
		}
	
		c.JSON(http.StatusOK, "Medication constraint deleted successfully")
	})
	
	r.PUT("/v1/medicationconstraints/:medicationid/:conditiontype", func(c *gin.Context) {
		medicationIDStr := c.Param("medicationid")
		_, err := strconv.Atoi(medicationIDStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid medication ID")
			return
		}
		
		var constraint model.MedicationConstraint
		if err := c.BindJSON(&constraint); err != nil {
			c.JSON(http.StatusBadRequest, "Failed to unmarshal medication constraint")
			return
		}
		
		// Call the function to update the medication constraint in the database
		err = pg.EditMedicationConstraint(constraint)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Failed to update medication constraint")
			return
		}
		
		c.JSON(http.StatusOK, gin.H{
			"message": "Medication constraint updated successfully",
		})
	})	

	r.GET("/v1/allusermedicationswithconstraint/:userId/:conditiontype", func(c *gin.Context) {
		userId := c.Param("userId")
		uId, err := strconv.Atoi(userId)

		if err != nil {
			c.JSON(http.StatusBadRequest, "Invalid medication ID")
			return
		}
		
		conditionType := c.Param("conditiontype")
		
		constraint, err := pg.GetAllUserMedicationsWithConstraint(uId, conditionType)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Oops")
			return
		}
		
		c.JSON(http.StatusOK, constraint)
	})

	return r;
}