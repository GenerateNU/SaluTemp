import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Email from './screens/Email';
import Register from './screens/Register';
import MedOverviewScreen from './screens/MedOverviewScreen';
import NewMedScreen from './screens/NewMedScreen';
import MedicationsList from './screens/MedicationsList';
import EmailAndPassword from './screens/EmailAndPassword';
import Name from './screens/Name';
import Password from './screens/Password'
import ForgotPassword from './screens/ForgotPassword';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Email' 
          component={Email} 
          options={{
            title: 'Email'
          }}
        />
        <Stack.Screen 
          name='EmailAndPassword' 
          component={EmailAndPassword} 
          options={{
            title: 'Login'
          }}
        />
        <Stack.Screen 
          name='Name' 
          component={Name} 
          options={{
            title: 'Name'
          }}
        />
        <Stack.Screen 
          name='Password' 
          component={Password} 
          options={{
            title: 'Password'
          }}
        />
        <Stack.Screen 
          name='ForgotPassword' 
          component={ForgotPassword} 
          options={{
            title: 'Forgot Password'
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
