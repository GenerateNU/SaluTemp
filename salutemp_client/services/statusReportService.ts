import { statusReport, storedMedication, medicationConstraint, alert } from "../types/index";

import axios, { Axios } from "axios";
import { API_URL } from "./apiLinks";

const userId = "2";
let expoPushToken = ""

class statusReportService {
    async statusReports(): Promise<void> {        
        let temperature = Math.random() * (13) + 17;
        let humidity = Math.random() * (15) + 35;
        let light = Math.random() * (400) + 20;

        const storedMedicationsResponse = await axios.get(`${API_URL}/v1/storedmedications/user/${userId}`)

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

            await axios.post(`${API_URL}/v1/addstatusreports`, report);

            const constraints = (await axios.get(`${API_URL}/v1/medicationconstraints/storedmedication/${stored_medication_id}`)).data

            for (const constraint of constraints) {
                let body: string;
                switch (constraint.condition_type) {
                    case "TEMPERATURE":
                        console.log(constraint.condition_type, '    ', constraint.max_threshold, '    ',constraint.min_threshold, '    ', temperature)
                        if (temperature > constraint.max_threshold) {
                            body = "Heads up! Your medication has exceeded its maximum recommended temperature!"
                            console.warn(body)
                            expoPushToken = (await axios.get(`${API_URL}/v1/expo_notification_tokens/${userId}`)).data
                            await axios.post(`${API_URL}/v1/addalerts`, buildAlert(constraint.condition_type, report, body))
                            const res = sendPushNotification(body);
                        }
                        if (temperature < constraint.min_threshold) {
                            body = "Heads up! Your medication has exceeded its minimum recommended temperature!"
                            console.warn(body)
                            expoPushToken = (await axios.get(`${API_URL}/v1/expo_notification_tokens/${userId}`)).data
                            await axios.post(`${API_URL}/v1/addalerts`, buildAlert(constraint.condition_type, report, body))
                            const res = sendPushNotification(body);
                        }
                        break;
                    case "HUMIDITY":
                        console.log(constraint.condition_type, '    ', constraint.max_threshold, '    ',constraint.min_threshold, '    ', humidity)
                        if (humidity > constraint.max_threshold) {
                            body = "Heads up! Your medication has exceeded its maximum recommended humidity!"
                            console.warn(body)
                            expoPushToken = (await axios.get(`${API_URL}/v1/expo_notification_tokens/${userId}`)).data
                            await axios.post(`${API_URL}/v1/addalerts`, buildAlert(constraint.condition_type, report, body))
                            const res = sendPushNotification(body);
                        }
                        if (humidity < constraint.min_threshold) {
                            body = "Heads up! Your medication has exceeded its minimum recommended humidity!"
                            console.warn(body)
                            expoPushToken = (await axios.get(`${API_URL}/v1/expo_notification_tokens/${userId}`)).data
                            await axios.post(`${API_URL}/v1/addalerts`, buildAlert(constraint.condition_type, report, body))
                            const res = sendPushNotification(body);
                        }
                        break;
                    case "LIGHT_EXPOSURE":
                        console.log(constraint.condition_type, '    ', constraint.max_threshold, '    ',constraint.min_threshold, '    ', light)
                        if (light > constraint.max_threshold) {
                            body = "Heads up! Your medication has exceeded its maximum recommended light exposure!"
                            console.warn(body)
                            expoPushToken = (await axios.get(`${API_URL}/v1/expo_notification_tokens/${userId}`)).data
                            await axios.post(`${API_URL}/v1/addalerts`, buildAlert(constraint.condition_type, report, body))
                            const res = sendPushNotification(body);
                        }
                        break;
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

async function sendPushNotification(body: string) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Salutemp',
        body: body,
        data: { someData: 'alert notification' },
      };

      axios.post('https://exp.host/--/api/v2/push/send', message, {
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        }
      })
}