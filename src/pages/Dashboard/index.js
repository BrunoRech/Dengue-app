import React, { useEffect, useState } from 'react';
import { BarChart } from '../../components';
import useApi from '../../hooks/useApi';
import { AppContainer } from '../../styles';
import { ANUAL } from '../../utils/constants';

const Dashboard = () => {
  const { get } = useApi();
  const [period, setPeriod] = useState(ANUAL);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await get('/bairros/1/focos', null, {
        headers: { periodo: period },
      });
      setGraphData(data);
    };
    fetchData();
  }, [get, period]);

  return (
    <AppContainer>
      <BarChart data={graphData} />
    </AppContainer>
  );
};

export default Dashboard;
