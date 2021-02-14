import React from 'react';
import { Dimensions } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { GraphContainer } from '../../styles';
import { buildDate } from '../../utils';

const BarChart = ({ data = [], noPadding }) => {
  return (
    <GraphContainer>
      <VictoryChart
        padding={{
          left: 80,
          right: 10,
          bottom: noPadding ? 50 : 150,
          top: 50,
        }}
        minDomain={{ y: 0 }}
        height={500}
        horizontal={data.length > 5}
        width={Dimensions.get('window').width - 20}
        theme={VictoryTheme.material}
        domainPadding={[50, 50]}
      >
        <VictoryBar
          labels={({ datum }) => datum.total}
          style={{
            data: {
              fill: '#000',
              stroke: '#000',
              fillOpacity: 0.7,
              strokeWidth: 3,
            },
            labels: {
              fontSize: 15,
              fill: '#000',
            },
          }}
          data={data.map(({ total, dia, mes, ano, nome }) => ({
            total,
            data: mes ? buildDate(dia, mes, ano) : null,
            nome,
          }))}
          x={data[0] && data[0].mes ? 'data' : 'nome'}
          y="total"
        />
      </VictoryChart>
    </GraphContainer>
  );
};

export default BarChart;
