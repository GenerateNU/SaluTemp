import * as Notifications from 'expo-notifications';

// Replace with API endpoint
const API_ENDPOINT = 'https:...';
// Replace with user ID
const userId = 'user123';

export async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;

  // send token to backend
  sendTokenToBackend(token);

  return token;
}

export const sendTokenToBackend = async (token: string) => {
  try {
    const response = await fetch('http:...', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: 'yourUserId', // Replace with actual user ID
        token
      })
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw error;
  }
};
