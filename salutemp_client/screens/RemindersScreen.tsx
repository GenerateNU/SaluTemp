import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import CalendarComponent from '../components/Calendar'; 
import { useNavigation } from '@react-navigation/native'; 

// Mock data for the reminders
const mockReminders = [
  { id: 1, name: 'Insulin', time: '2:00 PM', completed: false },
  { id: 2, name: 'Accutane', time: '11:00 AM', completed: true },
  { id: 3, name: 'Humira', time: '12:00 AM', completed: true },
  // ... more reminders
];

function RemindersScreen() {
    const [reminders, setReminders] = useState(mockReminders);
    const navigation = useNavigation(); // This hook gives you access to navigation anywhere in the component

    const handlePressReminder = (reminderId) => {
        // Here you would navigate to the details page for the reminder
        // navigation.navigate('ReminderDetails', { id: reminderId });
    };

    const handleToggleReminder = (reminderId) => {
        setReminders(reminders.map(reminder => 
        reminder.id === reminderId ? { ...reminder, completed: !reminder.completed } : reminder
        ));
    };  

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#022B3A' }]}>
      <View style={{ backgroundColor: '#022B3A', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.header}>Reminders</Text>
      </View>
      <ScrollView style={[{ backgroundColor: colors.white }]}>
      <CalendarComponent onDateSelected={(date: Moment) => console.log(date.format('MMMM D'))} />
        {/* To Take Section */}
        <Text style={styles.sectionTitle}>To take</Text>
        {reminders.filter(r => !r.completed).map((reminder) => (
          <View key={reminder.id} style={styles.card}>
            <TouchableOpacity style={styles.checkbox} onPress={() => handleToggleReminder(reminder.id)}>
              {reminder.completed && <View style={styles.checked} />}
            </TouchableOpacity>
            <View style={styles.iconPlaceholder}></View>
            <View style={styles.reminderText}>
              <Text style={styles.medicineName}>{reminder.name}</Text>
              <Text>{reminder.time}</Text>
            </View>
            <TouchableOpacity onPress={() => handlePressReminder(reminder.id)}>
              <MaterialIcons name="chevron-right" size={25} color="black" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Completed Section */}
        <Text style={styles.sectionTitle}>Completed</Text>
        {reminders.filter(r => r.completed).map((reminder) => (
          <View key={reminder.id} style={styles.card}>
            <TouchableOpacity style={styles.checkbox} onPress={() => handleToggleReminder(reminder.id)}>
              {reminder.completed && <View style={styles.checked} />}
            </TouchableOpacity>
            <View style={styles.iconPlaceholder}></View>
            <View style={styles.reminderText}>
              <Text style={styles.medicineName}>{reminder.name}</Text>
              <Text>{reminder.time}</Text>
            </View>
            <TouchableOpacity onPress={() => handlePressReminder(reminder.id)}>
              <MaterialIcons name="chevron-right" size={25} color="black" />
            </TouchableOpacity>
          </View>
        ))}
        <Button title="Edit reminders" color={colors.black}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: '#022B3A',
    color: colors.white,
    paddingVertical: 10 // Adjust this as needed for proper vertical alignment
  },
  card: {
    backgroundColor: '#C3D2D7',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  checkbox: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#022B3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  checked: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: '#022B3A',
  },
  iconPlaceholder: {
    height: 50,
    width: 50,
    backgroundColor: '#BBBBBB',
    borderRadius: 5,
    marginRight: 15,
  },
  reminderText: {
    flex: 1,
  },
  medicineName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
});

export default RemindersScreen;
