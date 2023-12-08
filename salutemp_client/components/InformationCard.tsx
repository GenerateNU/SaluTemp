import React from 'react';
import { StyleSheet, View, GestureResponderEvent } from 'react-native';
import RightArrow from '../assets/right-arrow.svg';
import { Status, getStatusColors } from '../types/medicationTypes';

interface InformationCardProps {
  status: Status;
  children: JSX.Element[] | JSX.Element;
  cardTouchAction: () => any;
}

export default function InformationCard(props: InformationCardProps) {
  const [touchStartPosition, setTouchStartPosition] = React.useState<number>();

  // handle scrolling
  const handleTouchStart = (event: GestureResponderEvent) => {
    const position = event.nativeEvent.locationY;
    setTouchStartPosition(position);
  };

  const handleTouchEnd = (event: GestureResponderEvent) => {
    if (touchStartPosition === event.nativeEvent.locationY) {
      props.cardTouchAction();
    }
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
