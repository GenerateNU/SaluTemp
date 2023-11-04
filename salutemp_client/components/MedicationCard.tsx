import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';
import { StackNavigation } from '../App';

interface MedicationCardProps {
  name: string;
  status: string;
  photo?: string;
}

export default function MedicationCard({ name, status, photo }: MedicationCardProps) {
  const { navigate } = useNavigation<StackNavigation>();
  return (
    <View style={styles.medCard} onTouchEnd={() => navigate('MedicationOverview')}>
      <View style={styles.preview}>
        <TouchableHighlight style={styles.addPhoto}>
          {photo ? null : <MaterialIcons name="add" size={20} color={colors.darkNeutral} />}
        </TouchableHighlight>
        <View>
          <Text>{name}</Text>
          <Text style={styles.subtitle}>{status}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    alignSelf: 'center',
    flexDirection: 'column',
    gap: 20
  },

  title: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.darkNeutral
  },

  subtitle: {
    fontSize: 12
  },

  medCard: {
    backgroundColor: colors.lightNeutral,
    borderRadius: 10,
    height: 100,
    width: 360,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },

  preview: {
    flexDirection: 'row',
    gap: 16
  },

  addPhoto: {
    backgroundColor: colors.coordinatingColor,
    borderRadius: 8,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

/**
 * <View style={styles.medCard} onTouchEnd={() => navigate("New")}>
                <View style={styles.preview}>
                    <TouchableHighlight style={styles.addPhoto}>
                        <MaterialIcons name="add" size={20} color={colors.darkNeutral} />
                    </TouchableHighlight>
                    <View>
                        <Text>Name</Text>
                        <Text style={styles.subtitle}>Status Check</Text>
                    </View>
                </View>
            </View><View style={styles.medCard}>
                <View style={styles.preview}>
                    <TouchableHighlight style={styles.addPhoto}>
                        <MaterialIcons name="add" size={20} color={colors.darkNeutral} />
                    </TouchableHighlight>
                    <View>
                        <Text>Name</Text>
                        <Text style={styles.subtitle}>Status Check</Text>
                    </View>
                </View>
            </View><View style={styles.medCard}>
                <View style={styles.preview}>
                    <TouchableHighlight style={styles.addPhoto}>
                        <MaterialIcons name="add" size={20} color={colors.darkNeutral} />
                    </TouchableHighlight>
                    <View>
                        <Text>Name</Text>
                        <Text style={styles.subtitle}>Status Check</Text>
                    </View>
                </View>
            </View>
 */
