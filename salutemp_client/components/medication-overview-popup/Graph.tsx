import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryScatter
} from 'victory-native';
import colors from '../../config/colors';
import { MedOverviewTypeEnum, getMedOverviewTypeSymbol } from '../../types/medicationTypes';

interface GraphProps {
  type: MedOverviewTypeEnum;
  min: number;
  max: number;
  data: { time: number; point: number }[];
}

export default function Graph(props: GraphProps) {
  const { width, height } = Dimensions.get('window');
  return (
    <View
      style={[
        styles.container,
        {
          flex: 1,
          alignSelf: 'center',
          maxHeight: height / 4.1,
          marginBottom: 20,
          marginTop: 20
        }
      ]}
    >
      <VictoryChart
        width={width / 1.3}
        height={height / 4}
        padding={{ right: width / 10, left: width / 8, top: height / 20, bottom: height / 20 }}
      >
        <VictoryAxis
          tickCount={2}
          tickValues={[24, 12]}
          tickFormat={(t) => `${t} hrs`}
          invertAxis
          style={{
            grid: {
              stroke: '#1D1D1D',
              strokeDasharray: '0'
            },
            tickLabels: { fontSize: width / 25 }
          }}
        />
        <VictoryAxis
          dependentAxis
          tickCount={1}
          tickValues={[props.min]}
          style={{
            grid: {
              stroke: '#1D1D1D',
              strokeDasharray: '0'
            },
            tickLabels: { fontSize: width / 25 }
          }}
          tickFormat={(t) => `${t}${getMedOverviewTypeSymbol(props.type)}`}
        />
        <VictoryAxis
          dependentAxis
          tickCount={1}
          tickValues={[props.max - (props.max - props.min) / 2]}
          tickFormat={(t) => ''}
          style={{
            grid: {
              stroke: '#1D1D1D',
              strokeDasharray: '0'
            }
          }}
        />
        <VictoryAxis
          dependentAxis
          tickCount={1}
          tickValues={[props.max]}
          style={{ tickLabels: { fontSize: width / 25 } }}
          tickFormat={(t) => `${t}${getMedOverviewTypeSymbol(props.type)}`}
        />
        <VictoryGroup domain={{ x: [props.min, 0], y: [props.min, props.max] }}>
          <VictoryLine
            interpolation="linear"
            style={{
              data: { stroke: '#1D1D1D' }
            }}
            data={props.data}
            y="point"
            x="time"
          />
          <VictoryScatter
            y="point"
            x="time"
            data={props.data.filter((d) => d.time === 12 || d.time === 24)}
            size={width / 30}
            style={{
              data: {
                fill: '#022B3A'
              },
              labels: {
                fill: 'white',
                fontSize: width / 40
              }
            }}
            labels={({ datum }: any) => `${datum.point}${getMedOverviewTypeSymbol(props.type)}`}
            labelComponent={
              <VictoryLabel
                dy={width / 80}
                style={{
                  fill: 'white',
                  fontSize: width / 40
                }}
              />
            }
          />
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 20,
    width: '90%',
    display: 'flex',
    alignItems: 'center'
  }
});
