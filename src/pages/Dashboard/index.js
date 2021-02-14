import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Select from 'react-native-picker-select';
import { BarChart } from '../../components';
import useApi from '../../hooks/useApi';
import { HOJE, fullPeriods } from '../../utils/constants';
import {
  AppContainer,
  BlackText,
  ChartSelectContainer,
  FlexContainerMini,
} from '../../styles';

const Dashboard = () => {
  const { get } = useApi();
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
      const { data } = await get('/ruas/focos', null, {
        headers: { periodo: streetPeriod },
      });
      setStreetData(data);
    };
    fetchData();
  }, [get, streetPeriod]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await get('/bairros/focos', null, {
        headers: { periodo: districtPeriod },
      });
      setDistrictData(data);
    };
    fetchData();
  }, [get, districtPeriod]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await get('/municipios/focos', null, {
        headers: { periodo: cityPeriod },
      });
      setCityData(data);
    };
    fetchData();
  }, [get, cityPeriod]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await get('/grupos/visitas', null, {
        headers: { periodo: groupPeriod },
      });
      setGroupData(data);
    };
    fetchData();
  }, [get, groupPeriod]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await get('/agentes/visitas', null, {
        headers: { periodo: agentPeriod },
      });
      setAgentData(data);
    };
    fetchData();
  }, [get, agentPeriod]);

  return (
    <AppContainer>
      <ScrollView>
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
        <BarChart data={streetData} />

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
        <BarChart data={districtData} />

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
        <BarChart data={cityData} />

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
        <BarChart data={agentData} />

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
