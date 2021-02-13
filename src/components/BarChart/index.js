import React from 'react';
import { Dimensions } from 'react-native';
import { BarChart as Chart } from 'react-native-chart-kit';
import { buildDate } from '../../utils';

const chartConfig = {
  backgroundColor: '#f5f5f5',
  backgroundGradientFrom: '#f5f5f5',
  backgroundGradientTo: '#f5f5f5',
  borderBottomRightRadius: 15,
  paddingRight: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // linha
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // legenda
};

const BarChart = ({ data = [] }) => {
  return (
    <Chart
      width={Dimensions.get('window').width}
      height={300}
      showBarTops
      chartConfig={chartConfig}
      verticalLabelRotation={50}
      style={chartConfig}
      fromZero
      withInnerLines={false}
      withOuterLines={false}
      bezier
      withHorizontalLabels={false}
      showValuesOnTopOfBars
      data={{
        labels: data.map(({ dia, mes, ano }) => buildDate(dia, mes, ano)),
        datasets: [
          {
            data: data.map(({ total }) => total),
          },
        ],
      }}
    />
  );
};

export default BarChart;
