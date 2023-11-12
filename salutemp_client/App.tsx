import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Register from './screens/Register';
import MedOverviewScreen from './screens/MedOverviewScreen';
import NewMedScreen from './screens/NewMedScreen';
import MedicationsList from './screens/MedicationsList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Login' 
          component={Login} 
          options={{
            title: 'Login'
          }}
        />
        <Stack.Screen
          name='Register'
          component={Register}
          options={{
            title: 'Register'
          }}
        />        
        <Stack.Screen
          name="MedicationOverview"
          component={MedOverviewScreen}
          options={{
            headerShown: true
          }
          }
        />       
        <Stack.Screen
          name="New"
          component={NewMedScreen}
          options={{
            headerShown: true
          }
          }
        />        
        <Stack.Screen
          name="MedList"
          component={MedicationsList}
          options={{
            headerShown: false
          }
          }
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
