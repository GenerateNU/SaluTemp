import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type ReminderItem = {
  id: number;
  name: string;
  schedule: string;
};

const mockEditReminders: ReminderItem[] = [
  { id: 1, name: 'Insulin', schedule: 'M, W, Th' },
  { id: 2, name: 'Accutane', schedule: 'Daily' },
  { id: 3, name: 'Humira', schedule: 'Thursday' },
  // ... more reminders
];

// logic to connect indivdual reminders with their own edit screen goes here
// connect to example screen for accutane EditReminderScreen.tsx

const EditRemindersScreen: React.FC = () => {
  const renderItem = ({ item }: { item: ReminderItem }) => (
    <View style={styles.itemContainer}>
      <View style={styles.iconPlaceholder}>
        <MaterialIcons size={24} color="#000" /> {/* Change icon as needed */}
      </View>
      <View style={styles.reminderDetails}>
        <Text style={styles.medicineName}>{item.name}</Text>
        <Text>{item.schedule}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={25} color="black" />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockEditReminders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 15,
  },
  reminderDetails: {
    flex: 1,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditRemindersScreen;
