import { statusReport, storedMedication, medicationConstraint, alert } from "../types/index";

import axios, { Axios } from "axios";

const userId = 1;
const baseUrl = 'https://mammal-on-shortly.ngrok-free.app'

class statusReportService {
    async statusReports(): Promise<void> {        
        let temperature = Math.random() * (14) + 28;
        let humidity = Math.random() * (10) + 20;
        let light = Math.random() * (10);

        const storedMedicationsResponse = await axios.get(`${baseUrl}/v1/storedmedications/user/${userId}`)

        const storedMedications = storedMedicationsResponse.data

        for (const stored_medication of storedMedications) {
            const stored_medication_id = stored_medication.stored_medication_id;

            let report: statusReport = {
                event_time: new Date(Date.now()).toISOString(),
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
                        console.log(constraint.condition_type, '    ', constraint.max_threshold, '    ',constraint.min_threshold, '    ', temperature)
                        if (temperature > constraint.max_threshold) {
                            body = "Heads up! Your medication has exceeded its maximum recommended temperature!"
                            console.warn(body)
                            await axios.post(`${baseUrl}/v1/addalerts`, buildAlert(constraint.condition_type, report, body))
                        }
                        if (temperature < constraint.min_threshold) {
                            body = "Heads up! Your medication has exceeded its minimum recommended temperature!"
                            console.warn(body)
                            await axios.post(`${baseUrl}/v1/addalerts`, buildAlert(constraint.condition_type, report, body))
                        }
                        break;
                    case "HUMIDITY":
                        console.log(constraint.condition_type, '    ', constraint.max_threshold, '    ',constraint.min_threshold, '    ', humidity)
                        if (humidity > constraint.max_threshold) {
                            body = "Heads up! Your medication has exceeded its maximum recommended humidity!"
                            console.warn(body)
                            await axios.post(`${baseUrl}/v1/addalerts`, buildAlert(constraint.condition_type, report, body))
                        }
                        if (humidity < constraint.min_threshold) {
                            body = "Heads up! Your medication has exceeded its minimum recommended humidity!"
                            console.warn(body)
                            await axios.post(`${baseUrl}/v1/addalerts`, buildAlert(constraint.condition_type, report, body))
                        }
                        break;
                    case "LIGHT":
                        console.log(constraint.condition_type, '    ', constraint.max_threshold, '    ',constraint.min_threshold, '    ', light)
                        if (light > constraint.max_threshold) {
                            body = "Heads up! Your medication has exceeded its maximum recommended light exposure!"
                            console.warn(body)
                            await axios.post(`${baseUrl}/v1/addalerts`, buildAlert(constraint.condition_type, report, body))
                        }
                }
            }
        };
    }
}

const startStatusReports = new statusReportService()
export default startStatusReports;

function buildAlert(condition_type: any, report: statusReport, body: string): alert {
    const alert: alert = {
        warning_id: Math.floor(Math.random()*10000),
        stored_medication_id: report.stored_medication_id,
        warning_timestamp: report.event_time,
        warning_description: body,
        condition_type: condition_type
    }

    return alert
}
