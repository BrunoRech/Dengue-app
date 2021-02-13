import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import Select from 'react-native-picker-select';
import { UseApi } from '../../hooks';
import { BarChart, Description } from '../../components';
import {
  AppContainer,
  BlackText,
  ChartContainer,
  ChartSelectContainer,
  DetailsContainer,
  FlexContainerMini,
  InvisibleButton,
} from '../../styles';
import { periods, SEMANAL } from '../../utils/constants';

const CityDetails = ({ route, navigation }) => {
  const { get } = UseApi();
  const { cityId } = route.params;
  const [city, setCity] = useState({});
  const [period, setPeriod] = useState(SEMANAL);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchCity = async () => {
      const { data } = await get(`/municipios/${cityId}`);
      if (data) {
        setCity(data);
      }
    };
    fetchCity();
  }, [get, cityId]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await get(`/municipios/${cityId}/focos`, null, {
        headers: { periodo: period },
      });
      setGraphData(data);
    };
    fetchData();
  }, [get, period, cityId]);

  return (
    <AppContainer>
      <DetailsContainer>
        <View>
          <Description name="Nome:" value={city.nome} />
        </View>
        <InvisibleButton
          onPress={() =>
            navigation.navigate('Alterar Município', { cityId: city.id })
          }
        >
          <Icon name="pencil" size={24} color="#000" />
        </InvisibleButton>
      </DetailsContainer>

      <ChartContainer>
        <FlexContainerMini>
          <BlackText>Número de Focos</BlackText>
          <ChartSelectContainer>
            <Select
              value={period}
              onValueChange={value => setPeriod(value)}
              items={periods}
              placeholder={{
                value: period,
                label: 'Período',
              }}
            />
          </ChartSelectContainer>
        </FlexContainerMini>
        <BarChart data={graphData} />
      </ChartContainer>
    </AppContainer>
  );
};

export default CityDetails;
