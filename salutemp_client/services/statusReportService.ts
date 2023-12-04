import { statusReport, storedMedication, medicationConstraint } from "../types/index";

import { CronJob } from "cron";
import axios, { Axios } from "axios";

const userId = 201;

new CronJob (
    "*/30 * * * * *",
    async function () {        
        let temperature = Math.random() * (31) + 50;
        let humidity = Math.random() * (10) + 20;
        let light = Math.random() * (10);

        const storedMedicationsResponse = await axios.get(`/v1/storedmedications/${userId}`)

        const storedMedications = storedMedicationsResponse.data()

        storedMedications.forEach(async (storedMedication: { stored_medication: storedMedication; }) => {
            const stored_medication = storedMedication.stored_medication;

            let report: statusReport = {
                time: Date.now().toString(),
                stored_medication_id: stored_medication.stored_medication_id,
                temperature: temperature,
                humidity: humidity,
                light: light
            }

            await axios.post("/v1/addstatusreports", report);

            const constraints = (await axios.get("/v1/medicationconstraints/:storedmedication")).data()

            constraints.forEach(async (constraint: { constraint: medicationConstraint; }) => {

            })});
        },
    null,
    true
)