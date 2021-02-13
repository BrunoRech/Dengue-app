import React from 'react';
import { Dimensions } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { GraphContainer } from '../../styles';
import { buildDate } from '../../utils';

const BarChart = ({ data = [] }) => {
  return (
    <GraphContainer>
      <VictoryChart
        padding={{ left: 80, right: 10, bottom: 100, top: 50 }}
        minDomain={{ y: 0 }}
        height={500}
        horizontal
        width={Dimensions.get('window').width - 20}
        theme={VictoryTheme.material}
        domainPadding={[50, 50]}
      >
        <VictoryBar
          barWidth={25}
          data={data.map(({ total, dia, mes, ano }) => ({
            total,
            data: buildDate(dia, mes, ano),
          }))}
          x="data"
          y="total"
        />
      </VictoryChart>
    </GraphContainer>
  );
};

export default BarChart;
