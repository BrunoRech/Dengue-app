import React from 'react';
import { Dimensions } from 'react-native';
import { BarChart as Chart } from 'react-native-chart-kit';

const chartConfig = {
  backgroundColor: '#f5f5f5',
  backgroundGradientFrom: '#f5f5f5',
  backgroundGradientTo: '#f5f5f5',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // linha
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // legenda
};

const BarChart = ({ labels, data }) => {
  return (
    <Chart
      width={Dimensions.get('window').width - 20}
      height={300}
      yAxisLabel="$"
      chartConfig={chartConfig}
      verticalLabelRotation={30}
      style={chartConfig}
      data={{
        labels: labels || [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
        ],
        datasets: [
          {
            data: data || [20, 45, 28, 80, 99, 43],
          },
        ],
      }}
    />
  );
};

export default BarChart;
