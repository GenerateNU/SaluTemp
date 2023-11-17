import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryScatter
} from 'victory-native';
import colors from '../../config/colors';
const data = [
  { hour: 36, temp: 37 },
  { hour: 24, temp: 39 },
  { hour: 18, temp: 44 },
  { hour: 12, temp: 41 },
  { hour: 6, temp: 45 },
  { hour: 0, temp: 39 }
];

export default function Graph() {
  return (
    <View style={styles.container}>
      <VictoryChart width={320} height={200}>
        <VictoryAxis
          tickCount={2}
          tickValues={[24, 12]}
          tickFormat={(t) => `${t} hrs`}
          invertAxis
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
          tickValues={[36]}
          style={{
            grid: {
              stroke: '#1D1D1D',
              strokeDasharray: '0'
            }
          }}
          tickFormat={(t) => `${t}°`}
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
        <VictoryAxis dependentAxis tickCount={1} tickValues={[46]} tickFormat={(t) => `${t}°`} />
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
            size={15}
            style={{ data: { fill: '#022B3A' }, labels: { fill: 'white' } }}
            labels={({ datum }: any) => `${datum.temp}°`}
            labelComponent={<VictoryLabel dy={8} />}
          />
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 20
  }
});
