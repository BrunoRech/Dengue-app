import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import useApi from '../../hooks/useApi';
import { AppContainer } from '../../styles';
import { SEMANAL } from '../../utils/constants';

const Dashboard = () => {
  const { get } = useApi();
  const [period, setPeriod] = useState(SEMANAL);
  const [graphData, setGraphData] = useState([]);

  /*   useEffect(() => {
    const fetchData = async () => {
      const { data } = await get(`/bairros/${districtId}/focos`, null, {
        headers: { periodo: period },
      });
      setGraphData(data);
    };
    fetchData();
  }, [get, period, districtId]); */

  return (
    <AppContainer>
      <ScrollView>
        <View />
        <View />
      </ScrollView>
    </AppContainer>
  );
};

export default Dashboard;
