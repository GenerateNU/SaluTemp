import { statusReport, storedMedication, medicationConstraint } from "../types/index";

import { CronJob } from "cron";
import axios, { Axios } from "axios";

const userId = 201;
const baseUrl = 'https://first-dragon-live.ngrok-free.app'

new CronJob (
    "*/30 * * * * *",
    async function () {        
        let temperature = Math.random() * (31) + 50;
        let humidity = Math.random() * (10) + 20;
        let light = Math.random() * (10);

        const storedMedicationsResponse = await axios.get(`${baseUrl}/v1/storedmedications/${userId}`)

        const storedMedications = storedMedicationsResponse.data()

        storedMedications.forEach(async (storedMedication: { stored_medication: storedMedication; }) => {
            const stored_medication_id = storedMedication.stored_medication.stored_medication_id;

            let report: statusReport = {
                time: Date.now().toString(),
                stored_medication_id: stored_medication_id,
                temperature: temperature,
                humidity: humidity,
                light: light
            }

            await axios.post(`${baseUrl}/v1/addstatusreports`, report);

            const constraints = (await axios.get(`${baseUrl}/v1/medicationconstraints/${stored_medication_id}`)).data()

            constraints.forEach(async (constraint: { constraint: medicationConstraint; }) => {
                let body: string;
                switch (constraint.constraint.condition_type) {
                    case "TEMPERATURE":
                        if (temperature > constraint.constraint.max_threshold) {
                            body = "Heads up! Your medication has exceeded its maximum recommended temperature!"
                        }
                        if (temperature < constraint.constraint.min_threshold) {
                            body = "Heads up! Your medication has exceeded its minimum recommended temperature!"
                        }
                        break;
                    case "HUMIDITY":
                        if (humidity > constraint.constraint.max_threshold) {
                            body = "Heads up! Your medication has exceeded its maximum recommended humidity!"
                        }
                        if (humidity < constraint.constraint.min_threshold) {
                            body = "Heads up! Your medication has exceeded its minimum recommended humidity!"
                        }
                        break;
                    case "LIGHT":
                        if (light > constraint.constraint.max_threshold) {
                            body = "Heads up! Your medication has exceeded its maximum recommended light exposure!"
                        }
                }
            })});
        },
    null,
    true
)