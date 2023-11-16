import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../config/colors';

function NotificationsScreen() {
    // Example notification data
    const notifications = [
        { id: 1, message: 'X medication has raised 3 degrees, consider moving', time: '12 minutes ago' },
        { id: 2, message: 'X medication has raised 3 degrees, consider moving', time: '12 minutes ago' },
        // add more notifs here 
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notifications</Text>
                <TouchableOpacity onPress={() => {}}>
                    <MaterialIcons name="close" size={28} color={colors.darkNeutral} />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.notificationsList}>
                {notifications.map((notification) => (
                    <View key={notification.id} style={styles.notificationCard}>
                        <Text style={styles.notificationMessage}>{notification.message}</Text>
                        <Text style={styles.notificationTime}>{notification.time}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.darkNeutral,
    },
    notificationsList: {
        padding: 20,
    },
    notificationCard: {
        backgroundColor: colors.lightNeutral,
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
    },
    notificationMessage: {
        fontSize: 16,
        color: colors.darkNeutral,
    },
    notificationTime: {
        fontSize: 12,
        color: colors.lightNeutral,
        marginTop: 4,
    },
    // ... any additional styles you may need
});

export default NotificationsScreen;
