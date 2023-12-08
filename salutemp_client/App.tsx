import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Email from './screens/Email';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import MedOverviewScreen from './screens/MedOverviewScreen';
import NewMedScreen from './screens/NewMedScreen';
import MedicationsList from './screens/MedicationsList';
import EmailAndPassword from './screens/EmailAndPassword';
import Name from './screens/Name';
import Password from './screens/Password';
import ForgotPassword from './screens/ForgotPassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from './config/colors';
import { Text, StyleSheet } from 'react-native';
import ReminderIcon from './assets/footer-icons/reminder.svg';
import HomeIcon from './assets/footer-icons/home.svg';
import BluetoothIcon from './assets/footer-icons/bluetooth.svg';
import Landing from './screens/Landing';
import ScanBarcode from './screens/ScanBarcode';
import ScanReviewScreen from './screens/ScanReviewScreen';
import startStatusReports from './services/statusReportService';
import RemindersScreen from './screens/RemindersScreen';

export type ScreenNames = [
  'Home',
  'Login',
  'Register',
  'MedicationOverview',
  'New',
  'MedList',
  'Scan',
  'ScanReview',
  'Email',
  'EmailAndPassword',
  'Name',
  'Password',
  'ForgotPassword',
  'Landing'
]; // type these manually
export type RootStackParamList = Record<ScreenNames[number], any>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const statusReports = setInterval(startStatusReports.statusReports, 15000)
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{
            title: 'SaluTemp'
          }}
        />
        <Stack.Screen
          name="Email"
          component={Email}
          options={{
            title: 'Email'
          }}
        />
        <Stack.Screen
          name="EmailAndPassword"
          component={EmailAndPassword}
          options={{
            title: 'Login'
          }}
        />
        <Stack.Screen
          name="Name"
          component={Name}
          options={{
            title: 'Name'
          }}
        />
        <Stack.Screen
          name="Password"
          component={Password}
          options={{
            title: 'Password'
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: 'Forgot Password'
          }}
        />
        <Stack.Screen
          name="Scan"
          component={ScanBarcode}
          options={{
            headerShown: true
          }}
        />
        <Stack.Screen
          name="ScanReview"
          component={ScanReviewScreen}
          options={{
            headerShown: true
          }}
        />
        <Stack.Screen name="MedList" options={{ headerShown: false }} component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.darkNeutral }
      }}
    >
      <Tab.Screen
        name="Devices"
        options={{
          headerShown: false,
          tabBarIcon: () => <BluetoothIcon />,
          tabBarLabel: () => <Text style={styles.text}>Devices</Text>
        }}
        component={MedicationsList}
      />
      <Tab.Screen
        name="Medications"
        options={{
          headerShown: false,
          tabBarIcon: () => <HomeIcon />,
          tabBarLabel: () => <Text style={styles.text}>Medications</Text>
        }}
        component={MedicationsList}
      />
      <Tab.Screen
        name="Reminders"
        options={{
          headerShown: false,
          tabBarIcon: () => <ReminderIcon />,
          tabBarLabel: () => <Text style={styles.text}>Reminders</Text>
        }}
        component={RemindersScreen} 
      />
      <Tab.Screen
        name="MedicationOverview"
        options={{ tabBarButton: () => null, headerShown: false }}
        component={MedOverviewScreen}
      />
      <Tab.Screen
        name="New"
        options={{ tabBarButton: () => null, headerShown: false }}
        component={NewMedScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  text: { color: colors.white, fontSize: 12 }
});
