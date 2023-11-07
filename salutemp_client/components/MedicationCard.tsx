import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, GestureResponderEvent } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';
import { StackNavigation } from '../App';

interface MedicationCardProps {
  name: string;
  status: string;
  photo?: string;
}

// TODO: Figure out how photo is stored

export default function MedicationCard({ name, status, photo }: MedicationCardProps) {
  const { navigate } = useNavigation<StackNavigation>();
  const [touchStartPosition, setTouchStartPosition] = React.useState<number>();

  const handleTouchEnd = (event: GestureResponderEvent) => {
    if (touchStartPosition === event.nativeEvent.locationY) {
      navigate('MedicationOverview');
    }
  };

  const handleTouchStart = (event: GestureResponderEvent) => {
    const position = event.nativeEvent.locationY;
    setTouchStartPosition(position);
  };
  const cardStatusColor =
    status === 'Good' ? colors.green : status === 'Warning' ? colors.yellow : colors.red;
  return (
    <View
      style={[
        styles.medCard,
        {
          backgroundColor: cardStatusColor
        }
      ]}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <View style={styles.preview}>
        <TouchableHighlight style={styles.addPhoto}>
          {photo ? null : (
            <MaterialIcons style={{ backgroundColor: colors.grey }} size={20} color={colors.grey} />
          )}
        </TouchableHighlight>
        <View>
          <Text>{name}</Text>
          <Text style={styles.subtitle}>Status: {status}</Text>
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
    backgroundColor: colors.grey,
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
