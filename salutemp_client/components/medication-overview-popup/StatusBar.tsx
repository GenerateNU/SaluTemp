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
        size={width / 1.7}
        width={width / 30}
        fill={fill}
        rotation={240}
        duration={1000}
        arcSweepAngle={240}
        tintColor={getStatusColors(props.status).side}
        backgroundColor="white"
        padding={20}
        lineCap="round"
        renderCap={({ center }) => (
          <Circle cx={center.x} cy={center.y} r={width / 25} fill="#022B3A" stroke="black" />
        )}
      >
        {() => (
          <>
            <View style={{ alignItems: 'center' }}>
              <View
                style={[
                  {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }
                ]}
              >
                <Text style={[styles.numberStyle, { fontSize: width / 8 }]}>{props.curr}</Text>
                {props.type !== MedOverviewTypeEnum.Humidity ? (
                  <Text style={[{ fontSize: width / 9 }]}>
                    {getMedOverviewTypeSymbol(props.type)}
                  </Text>
                ) : (
                  <Text
                    style={[{ fontSize: width / 25, marginBottom: 'auto', marginTop: width / 50 }]}
                  >
                    %
                  </Text>
                )}
              </View>
              <Text style={[styles.numberStyle, { fontSize: width / 14 }]}>{props.status}</Text>
            </View>
          </>
        )}
      </AnimatedCircularProgress>
      <View style={{ display: 'flex', flexDirection: 'row', top: -width / 6.25 }}>
        <Text style={[styles.minMaxStyle, { paddingRight: width / 6, fontSize: width / 27 }]}>
          {props.min}
          {props.type !== MedOverviewTypeEnum.Light
            ? getMedOverviewTypeSymbol(props.type)
            : ' Lumens'}
        </Text>
        <Text style={[styles.minMaxStyle, { fontSize: width / 27 }]}>
          {props.max}
          {props.type !== MedOverviewTypeEnum.Light
            ? getMedOverviewTypeSymbol(props.type)
            : ' Lumens'}
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
