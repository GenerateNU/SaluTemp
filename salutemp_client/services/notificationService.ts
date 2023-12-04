import * as Notifications from 'expo-notifications';

import { API_URL } from './apiLinks'; 

import * as Notification from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import express from 'express';

const app = express();
const port = 8000;

// ^ see authService and userContext

async function registerForPushNotificationsAsync() /*: Promise<string | null> */ {
	// notifications only work on physical devices
	if (!Device.isDevice) {
		alert(
			"Must use physical device for Push Notifications. Must be ios or android."
		);
		return null;
	}

	// ask user for notification permissions
	const { status } = await Notification.requestPermissionsAsync();
	if (status !== "granted") {
		alert("Failed to get push token for push notification!");
		return null;
	}

	// android needs notification channel with highest importance so notificaiton goes through always
	if (Platform.OS === "android") {
		Notification.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notification.AndroidImportance.MAX,
			// other notification settings that are customizable
			// vibrationPattern: [0, 250, 250, 250],
			// lightColor: '#FF231F7C',
		});
	}

	// gets push notification token
	const token = (await Notification.getExpoPushTokenAsync()).data;
	console.log("ExpoPushToken: ", token);

	return token;
}
