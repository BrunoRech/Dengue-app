import React, { useEffect, useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native';
import Select from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from '../../components';
import useApi from '../../hooks/useApi';
import { HOJE, fullPeriods } from '../../utils/constants';
import {
  AppContainer,
  BlackText,
  ChartSelectContainer,
  FlexContainerMini,
  InvisibleButton,
  RightPageHeader,
} from '../../styles';

const Dashboard = ({ navigation }) => {
  const { get } = useApi();
  const [refreshing, setRefreshing] = useState(false);
  const [streetPeriod, setStreetPeriod] = useState(HOJE);
  const [districtPeriod, setDistrictPeriod] = useState(HOJE);
  const [cityPeriod, setCityPeriod] = useState(HOJE);
  const [groupPeriod, setGroupPeriod] = useState(HOJE);
  const [agentPeriod, setAgentPeriod] = useState(HOJE);
  const [streetData, setStreetData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [agentData, setAgentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setRefreshing(true);
      const { data } = await get('/ruas/focos', null, {
        headers: { periodo: streetPeriod },
      });
      setStreetData(data);
      setRefreshing(false);
    };
    fetchData();
  }, [get, streetPeriod]);

  useEffect(() => {
    const fetchData = async () => {
      setRefreshing(true);
      const { data } = await get('/bairros/focos', null, {
        headers: { periodo: districtPeriod },
      });
      setDistrictData(data);
      setRefreshing(false);
    };
    fetchData();
  }, [get, districtPeriod]);

  useEffect(() => {
    const fetchData = async () => {
      setRefreshing(true);
      const { data } = await get('/municipios/focos', null, {
        headers: { periodo: cityPeriod },
      });
      setCityData(data);
      setRefreshing(false);
    };
    fetchData();
  }, [get, cityPeriod]);

  useEffect(() => {
    const fetchData = async () => {
      setRefreshing(true);
      const { data } = await get('/grupos/visitas', null, {
        headers: { periodo: groupPeriod },
      });
      setGroupData(data);
      setRefreshing(false);
    };
    fetchData();
  }, [get, groupPeriod]);

  useEffect(() => {
    const fetchData = async () => {
      setRefreshing(true);
      const { data } = await get('/agentes/visitas', null, {
        headers: { periodo: agentPeriod },
      });
      setAgentData(data);
      setRefreshing(false);
    };
    fetchData();
  }, [get, agentPeriod]);

  const handleSettings = async () => {
    const isAdmin = await AsyncStorage.getItem('isAdmin');
    const id = await AsyncStorage.getItem('userId');

    if (isAdmin === 'true') {
      return navigation.navigate('Alterar Coordenador', {
        adminId: Number(id),
      });
    }
    return navigation.navigate('Alterar Agente', {
      agentId: Number(id),
    });
  };

  return (
    <AppContainer>
      <ScrollView>
        <Spinner visible={refreshing} textContent="Aguarde..." />
        <RightPageHeader>
          <InvisibleButton onPress={handleSettings}>
            <Icon name="cog" size={24} color="#000" />
          </InvisibleButton>
        </RightPageHeader>
        <FlexContainerMini>
          <BlackText>Focos por Rua</BlackText>
          <ChartSelectContainer>
            <Select
              value={streetPeriod}
              onValueChange={value => setStreetPeriod(value)}
              items={fullPeriods}
              placeholder={{
                value: streetPeriod,
                label: 'Período',
              }}
            />
          </ChartSelectContainer>
        </FlexContainerMini>
        <BarChart data={streetData} noPadding />

        <FlexContainerMini>
          <BlackText>Focos por Bairro</BlackText>
          <ChartSelectContainer>
            <Select
              value={districtPeriod}
              onValueChange={value => setDistrictPeriod(value)}
              items={fullPeriods}
              placeholder={{
                value: districtPeriod,
                label: 'Período',
              }}
            />
          </ChartSelectContainer>
        </FlexContainerMini>
        <BarChart data={districtData} noPadding />

        <FlexContainerMini>
          <BlackText>Focos por Município</BlackText>
          <ChartSelectContainer>
            <Select
              value={cityPeriod}
              onValueChange={value => setCityPeriod(value)}
              items={fullPeriods}
              placeholder={{
                value: cityPeriod,
                label: 'Período',
              }}
            />
          </ChartSelectContainer>
        </FlexContainerMini>
        <BarChart data={cityData} noPadding />

        <FlexContainerMini>
          <BlackText>Visitas por Agente</BlackText>
          <ChartSelectContainer>
            <Select
              value={agentPeriod}
              onValueChange={value => setAgentPeriod(value)}
              items={fullPeriods}
              placeholder={{
                value: agentPeriod,
                label: 'Período',
              }}
            />
          </ChartSelectContainer>
        </FlexContainerMini>
        <BarChart data={agentData} noPadding />

        <FlexContainerMini>
          <BlackText>Visitas por Grupo</BlackText>
          <ChartSelectContainer>
            <Select
              value={groupPeriod}
              onValueChange={value => setGroupPeriod(value)}
              items={fullPeriods}
              placeholder={{
                value: groupPeriod,
                label: 'Período',
              }}
            />
          </ChartSelectContainer>
        </FlexContainerMini>
        <BarChart data={groupData} />
      </ScrollView>
    </AppContainer>
  );
};

export default Dashboard;
