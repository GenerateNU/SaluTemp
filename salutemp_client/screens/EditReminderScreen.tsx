// EditReminderScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../config/colors';

const EditReminderScreen: React.FC = () => {

  const reminder = {
    name: 'Accutane',
    dosage: '1 capsule',
    repeats: 'Daily',
    schedule: ['8:00 AM', '2:00 PM', '8:00 PM'],
    notes: 'Take twice a day after meals.',
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerButton}>Edit</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{reminder.name}</Text>
        <TouchableOpacity>
          <Text style={styles.headerButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Dosage</Text>
          <Text style={styles.infoContent}>{reminder.dosage}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Repeats</Text>
          <Text style={styles.infoContent}>{reminder.repeats}</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Schedule</Text>
      <View style={styles.scheduleContainer}>
        {reminder.schedule.map((time, index) => (
          <View key={index} style={styles.timeBox}>
            <Text style={styles.timeText}>{time}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton}>
        <MaterialIcons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Add Reminder</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Notes</Text>
      <TextInput
        style={styles.notesInput}
        multiline
        defaultValue={reminder.notes}
      />

      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete All Reminders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerButton: {
    fontSize: 16,
    color: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  infoContent: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  timeBox: {
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 10,
  },
  timeText: {
    fontSize: 18,
    color: 'white',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 18,
    color: colors.white,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: colors.grey,
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  deleteButton: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    fontSize: 18,
    color: colors.white,
  },
});

export default EditReminderScreen;
