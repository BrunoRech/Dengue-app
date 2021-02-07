import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import { AppContainer } from '../../styles';

const chartConfig = {
  backgroundColor: '#ccc',
  backgroundGradientFrom: '#ccc',
  backgroundGradientTo: '#ccc',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // linha
  labelColor: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // legenda
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#adad', // bolinha
  },
};

const screenWidth = Dimensions.get('window').width;

const Dashboard = () => {
  return (
    <AppContainer>
      <ScrollView>
        <View>
          <BarChart
            style={chartConfig}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                },
              ],
            }}
            width={screenWidth}
            height={220}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </View>
        <View>
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={screenWidth} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
    </AppContainer>
  );
};

export default Dashboard;
