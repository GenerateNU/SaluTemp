import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import Login from './screens/Login';
import Register from './screens/Register';
import MedOverviewScreen from './screens/MedOverviewScreen';
import NewMedScreen from './screens/NewMedScreen';
import MedicationsList from './screens/MedicationsList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from './config/colors';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Text } from 'react-native';

export type ScreenNames = ['Home', 'Login', 'Register', 'MedicationOverview', 'New', 'MedList']; // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MedList" options={{ headerShown: false }} component={Tabs} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login'
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: 'Register'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: colors.darkNeutral } }}>
      <Tab.Screen
        name="Medications"
        options={{
          headerShown: false,
          tabBarIcon: ({ size }) => (
            <SimpleLineIcons name="home" size={size} color={colors.white} />
          ),
          tabBarLabel: () => <Text style={{ color: colors.white }}>Medications</Text>
        }}
        component={MedicationsList}
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
