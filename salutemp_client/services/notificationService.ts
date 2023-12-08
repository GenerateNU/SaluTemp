import * as Notification from 'expo-notifications';

import * as Device from "expo-device";
import { Platform } from "react-native";
//import express from 'express';
import { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';

//const app = express();
//const port = 8000;

// ^ see authService and userContext

Notification.setNotificationHandler({
	handleNotification: async () => ({
	  shouldShowAlert: true,
	  shouldPlaySound: false,
	  shouldSetBadge: false,
	}),
  });

export const registerForPushNotificationsAsync = async () => {  
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
	const token = (await Notification.getExpoPushTokenAsync({
		projectId: Constants.expoConfig?.extra?.eas.projectId
	})).data;
	console.log("ExpoPushToken: ", token);

	return token;
}

const Notifications = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const [expoPushToken, setExpoPushToken] = useState("");

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => setExpoPushToken(token!));
	}
)}

export default Notifications;
