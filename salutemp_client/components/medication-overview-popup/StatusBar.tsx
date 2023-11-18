import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Circle } from 'react-native-svg';
import { getStatusColors, getMedOverviewTypeSymbol } from '../../types/medications/functions';
import { MedOverviewTypeEnum, Status } from '../../types/medications/types';

interface StatusBarProps {
  type: MedOverviewTypeEnum;
  min: number;
  max: number;
  curr: number;
  status: Status;
}

export default function StatusBar(props: StatusBarProps) {
  const { width } = Dimensions.get('window');

  const fill = Math.round(((props.curr - props.min) / (props.max - props.min)) * 100);
  return (
    <View style={{ flex: 1, paddingBottom: 10 }}>
      <AnimatedCircularProgress
        size={width / 1.5}
        width={width / 30}
        fill={fill}
        rotation={240}
        duration={1000}
        arcSweepAngle={240}
        tintColor={getStatusColors(props.status).main}
        backgroundColor="white"
        padding={20}
        lineCap="round"
        renderCap={({ center }) => (
          <Circle cx={center.x} cy={center.y} r={width / 30} fill="white" stroke="black" />
        )}
      >
        {() => (
          <>
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.numberStyle, { fontSize: width / 8 }]}>
                {props.curr}
                {getMedOverviewTypeSymbol(props.type)}
              </Text>
              <Text style={[styles.numberStyle, { fontSize: width / 14 }]}>{props.status}</Text>
            </View>
          </>
        )}
      </AnimatedCircularProgress>
      <View style={{ display: 'flex', flexDirection: 'row', top: -width / 6 }}>
        <Text style={[styles.minMaxStyle, { paddingRight: width / 6, fontSize: width / 25 }]}>
          {props.min}
          {getMedOverviewTypeSymbol(props.type)}
        </Text>
        <Text style={[styles.minMaxStyle, { fontSize: width / 25 }]}>
          {props.max}
          {getMedOverviewTypeSymbol(props.type)}
        </Text>
      </View>
    </View>
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
  },
  minMaxStyle: {
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '500',
    flex: 1,
    display: 'flex',
    textAlign: 'center'
  }
});
