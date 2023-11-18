import React from 'react';
import { StyleSheet, View, GestureResponderEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../App';
import RightArrow from '../assets/right-arrow.svg';
import { getStatusColors } from '../types/medications/functions';
import { Status } from '../types/medications/types';

interface InformationCardProps {
  status: Status;
  children: JSX.Element[];
}

export default function InformationCard(props: InformationCardProps) {
  const { navigate } = useNavigation<StackNavigation>();
  const [touchStartPosition, setTouchStartPosition] = React.useState<number>();

  const handleTouchEnd = (event: GestureResponderEvent) => {
    if (touchStartPosition === event.nativeEvent.locationY) {
      // TODO: this is going to need to be extracted at some point, but is good for now i think.
      navigate('MedicationOverview');
    }
  };

  const handleTouchStart = (event: GestureResponderEvent) => {
    const position = event.nativeEvent.locationY;
    setTouchStartPosition(position);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          {
            backgroundColor: getStatusColors(props.status).side
          },
          styles.medCard,
          styles.bottomCard
        ]}
      />
      <View
        style={[
          {
            backgroundColor: getStatusColors(props.status).main,
            padding: 10
          },
          styles.medCard,
          styles.topCard
        ]}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <View style={styles.cardContentContainer}>
          {props.children}
          <RightArrow style={{ marginLeft: 'auto' }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  medCard: {
    height: 100,
    justifyContent: 'center'
  },
  bottomCard: {
    width: 15,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  topCard: {
    width: '90%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  cardContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
