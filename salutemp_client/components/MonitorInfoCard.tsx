import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../config/colors';

interface MonitorInfoCardProps {
    category: string;
    value: string;
}

export default function MonitorInfoCard({ category, value } : MonitorInfoCardProps){
    return (
        <View style={styles.card}>
          <Text>{category}</Text>
          <View style={styles.row}>
            <Text>{value}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        gap: 5,
        padding: 15,
        backgroundColor: colors.grey,
        borderRadius: 20,
        height: 70,
        width: 280,
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
})
