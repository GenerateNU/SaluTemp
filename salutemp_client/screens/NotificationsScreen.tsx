import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../config/colors';

type Notification = {
  id: string;
  title: string;
  date: string;
};

const notifications: Notification[] = [
  { id: '1', title: 'X medication has raised 3 degrees, consider moving', date: 'Today' },
  // Add more notifications here
];

const NotificationScreenComponent: React.FC = () => {

  const renderItem = ({ item }: { item: Notification }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDate}>{item.date}</Text>
      </View>
      <TouchableOpacity onPress={() => {/* handle press */}}>
        <MaterialIcons name="chevron-right" size={25} color={colors.darkNeutral} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: colors.darkNeutral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  listContainer: {
    padding: 8,
  },
  notificationItem: {
    backgroundColor: colors.lightNeutral,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    color: colors.bodyText,
  },
  notificationDate: {
    fontSize: 12,
    color: colors.grey,
  },
});

export default NotificationScreenComponent;


