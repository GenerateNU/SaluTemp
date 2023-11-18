import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryScatter
} from 'victory-native';
import colors from '../../config/colors';
import { getMedOverviewTypeSymbol } from '../../types/medications/functions';
import { MedOverviewTypeEnum } from '../../types/medications/types';
const data = [
  { hour: 36, temp: 37 },
  { hour: 24, temp: 39 },
  { hour: 18, temp: 44 },
  { hour: 12, temp: 41 },
  { hour: 6, temp: 45 },
  { hour: 0, temp: 39 }
];
interface MedOverviewPopupGraphProps {
  type: MedOverviewTypeEnum;
}
export default function MedOverviewPopupGraph(props: MedOverviewPopupGraphProps) {
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
        padding={{ right: width / 10, left: width / 10, top: height / 20, bottom: height / 20 }}
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
          tickValues={[36]}
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
          tickValues={[41]}
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
          tickValues={[46]}
          style={{ tickLabels: { fontSize: width / 25 } }}
          tickFormat={(t) => `${t}${getMedOverviewTypeSymbol(props.type)}`}
        />
        <VictoryGroup domain={{ x: [36, 0], y: [36, 46] }}>
          <VictoryLine
            interpolation="linear"
            style={{
              data: { stroke: '#1D1D1D' }
            }}
            data={data}
            y="temp"
            x="hour"
          />
          <VictoryScatter
            y="temp"
            x="hour"
            data={data.filter((d) => d.hour === 12 || d.hour === 24)}
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
            labels={({ datum }: any) => `${datum.temp}${getMedOverviewTypeSymbol(props.type)}`}
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
