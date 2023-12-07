import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';

const customColors = {
  headerColor: '#022B3A',
  iconPlaceholder: '#BBBBBB',
  textPlaceholder: '#BBBBBB',
  background: '#FFFFFF',
  readIndicator: '#76A3B2',
};

type Notification = {
  id: number;
  message: string;
  timestamp: moment.Moment;
};

type NotificationsGroup = {
  [key: string]: Notification[];
};

type NotificationsScreenProps = {
  onClose: () => void;
};

const mockNotifications: Notification[] = [
  { id: 1, message: 'X medication has raised 3 degrees, consider moving', timestamp: moment().subtract(10, 'minutes') },
  { id: 2, message: 'X medication has raised 3 degrees, consider moving', timestamp: moment().subtract(1, 'day') },
  // ... more notifications
];

const groupNotificationsByDay = (notifications: Notification[]): NotificationsGroup => {
  const grouped: NotificationsGroup = {};
  notifications.forEach(notification => {
    const day = moment(notification.timestamp).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'dddd',
      sameElse: 'DD/MM/YYYY'
    });
    if (!grouped[day]) {
      grouped[day] = [];
    }
    grouped[day].push(notification);
  });
  return grouped;
};

function NotificationsScreen({ onClose }: NotificationsScreenProps) {
  const [readNotifications, setReadNotifications] = useState(new Set<number>());

  const notificationsByDay = groupNotificationsByDay(mockNotifications);

  const markAllAsRead = () => {
    const allIds = new Set(mockNotifications.map(notification => notification.id));
    setReadNotifications(allIds);
  };

  const handlePressNotification = (id: number) => {
    setReadNotifications(new Set(readNotifications.add(id)));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialIcons name="close" size={28} color={customColors.background} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.notificationsList}>
        {Object.keys(notificationsByDay).map(day => (
          <View key={day}>
            <Text style={styles.dayHeader}>{day}</Text>
            {notificationsByDay[day].map(notification => (
              <TouchableOpacity key={notification.id} style={styles.notificationCard} onPress={() => handlePressNotification(notification.id)}>
                <View style={styles.iconPlaceholder}></View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.notificationTime}>{moment(notification.timestamp).fromNow()}</Text>
                </View>
                {!readNotifications.has(notification.id) && <View style={styles.readIndicator}></View>}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
      <Button title="Mark all as read" onPress={markAllAsRead} color={customColors.headerColor} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: customColors.headerColor,
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  notificationsList: {
    padding: 20,
  },
  dayHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginBottom: 5,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: customColors.background,
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: customColors.iconPlaceholder,
  },
  iconPlaceholder: {
    height: 50,
    width: 50,
    backgroundColor: customColors.iconPlaceholder,
    borderRadius: 5,
  },
  notificationContent: {
    flex: 1,
    marginLeft: 10,
  },
  notificationMessage: {
    color: '#000000', 
  },
  notificationTime: {
    color: customColors.textPlaceholder,
  },
  readIndicator: {
    height: 10,
    width: 10,
    backgroundColor: customColors.readIndicator,
    borderRadius: 5,
  },
  closeButton: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
});

export default NotificationsScreen;
