import React from 'react';
import { StyleSheet } from 'react-native';
import MedOverviewScreen from './screens/MedOverviewScreen';
import NewMedScreen from './screens/NewMedScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MedicationsList from './screens/MedicationsList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Medication Overview"
          component={MedOverviewScreen}
        />
        <Stack.Screen
          name="New"
          component={NewMedScreen}
        />
        <Stack.Screen
        name="MedList"
        component={MedicationsList}/>
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
