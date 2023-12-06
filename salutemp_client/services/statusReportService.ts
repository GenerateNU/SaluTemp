import { statusReport, storedMedication, medicationConstraint } from "../types/index";

import axios, { Axios } from "axios";

const userId = 1;
const baseUrl = 'https://first-dragon-live.ngrok-free.app'

class statusReportService {
    async statusReports(): Promise<void> {        
        let temperature = Math.random() * (31) + 50;
        let humidity = Math.random() * (10) + 20;
        let light = Math.random() * (10);

        const storedMedicationsResponse = await axios.get(`${baseUrl}/v1/storedmedications/user/${userId}`)

        const storedMedications = storedMedicationsResponse.data

        for (const stored_medication of storedMedications) {
            const stored_medication_id = stored_medication.stored_medication_id;
            const time = Date.now().toString();

            let report: statusReport = {
                time: time,
                stored_medication_id: stored_medication_id,
                temperature: temperature,
                humidity: humidity,
                light: light
            }

            await axios.post(`${baseUrl}/v1/addstatusreports`, report);

            const constraints = (await axios.get(`${baseUrl}/v1/medicationconstraints/storedmedication/${stored_medication_id}`)).data

            for (const constraint of constraints) {
                let body: string;
                switch (constraint.condition_type) {
                    case "TEMPERATURE":
                        if (temperature > constraint.max_threshold) {
                            body = "Heads up! Your medication has exceeded its maximum recommended temperature!"
                        }
                        if (temperature < constraint.min_threshold) {
                            body = "Heads up! Your medication has exceeded its minimum recommended temperature!"
                        }
                        break;
                    case "HUMIDITY":
                        if (humidity > constraint.max_threshold) {
                            body = "Heads up! Your medication has exceeded its maximum recommended humidity!"
                        }
                        if (humidity < constraint.min_threshold) {
                            body = "Heads up! Your medication has exceeded its minimum recommended humidity!"
                        }
                        break;
                    case "LIGHT":
                        if (light > constraint.max_threshold) {
                            body = "Heads up! Your medication has exceeded its maximum recommended light exposure!"
                        }
                }
            }
        };
    }
}

export default statusReportService;