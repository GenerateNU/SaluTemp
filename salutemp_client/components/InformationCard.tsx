import React from 'react';
import { StyleSheet, View, GestureResponderEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';
import { StackNavigation } from '../App';
import { Status } from '../types';
import RightArrow from '../assets/right-arrow.svg';

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
            backgroundColor: getStatusColors(props.status).main
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

function getStatusColors(status: Status) {
  let cardStatusColor = { main: colors.black, side: colors.black };
  switch (status) {
    case Status.Good: {
      cardStatusColor = { main: colors.green, side: colors.darkGreen };
      break;
    }
    case Status.Warning: {
      cardStatusColor = { main: colors.yellow, side: colors.darkYellow };
      break;
    }
    case Status.Bad: {
      cardStatusColor = { main: colors.red, side: colors.darkRed };
      break;
    }
  }

  return cardStatusColor;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginLeft: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  medCard: {
    height: 100,
    padding: 20,
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  bottomCard: {
    width: 360,
    borderRadius: 10,
    right: 10,
    zIndex: 0
  },
  topCard: {
    width: '90%',
    zIndex: 1,
    position: 'absolute'
  },
  cardContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
