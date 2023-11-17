import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import colors from '../../config/colors';
import { View, StyleSheet, Text } from 'react-native';
import { Circle } from 'react-native-svg';

export default function StatusBar() {
  const max = 46;
  const min = 36;
  const curr = 41;
  const fill = Math.round(((curr - min) / (max - min)) * 100);
  const status = 'Bad';
  return (
    <AnimatedCircularProgress
      size={300}
      width={15}
      fill={fill}
      rotation={240}
      duration={1000}
      arcSweepAngle={240}
      tintColor={colors.darkRed}
      backgroundColor="white"
      padding={20}
      lineCap="round"
      renderCap={({ center }) => (
        <Circle cx={center.x} cy={center.y} r="13" fill="white" stroke="black" />
      )}
    >
      {() => (
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.numberStyle}>{curr}°</Text>
          <Text style={styles.statusStyle}>{status}</Text>
        </View>
      )}
    </AnimatedCircularProgress>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    display: 'flex',
    height: '10%',
    paddingHorizontal: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  popupStyle: {
    alignSelf: 'center',
    height: '80%',
    borderRadius: 20,
    width: '90%',
    flexDirection: 'column',
    backgroundColor: '#EFECE7'
  },
  titleStyle: {
    color: 'white',
    fontWeight: '500',
    flex: 1
  },
  numberStyle: {
    fontSize: 68,
    fontWeight: '500'
  },
  statusStyle: {
    fontSize: 30,
    fontWeight: '500'
  }
});
