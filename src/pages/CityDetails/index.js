import React, { useEffect, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { View } from 'react-native';
import Select from 'react-native-picker-select';
import { UseApi } from '../../hooks';
import { BarChart, Description } from '../../components';
import {
  AppContainer,
  BlackText,
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
  const [refreshing, setRefreshing] = useState(false);
  const [period, setPeriod] = useState(SEMANAL);
  const [graphData, setGraphData] = useState([]);

  const fetchCity = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get(`/municipios/${cityId}`);
    if (data) {
      setCity(data);
    }
    setRefreshing(false);
  }, [get, cityId]);

  useEffect(() => {
    fetchCity();
  }, [fetchCity]);

  useEffect(() => {
    const fetchData = async () => {
      setRefreshing(true);
      const { data } = await get(`/municipios/${cityId}/focos`, null, {
        headers: { periodo: period },
      });
      setGraphData(data);
      setRefreshing(false);
    };
    fetchData();
  }, [get, period, cityId]);

  return (
    <AppContainer>
      <Spinner visible={refreshing} textContent="Aguarde..." />
      <DetailsContainer>
        <View>
          <Description name="Nome:" value={city.nome} />
        </View>
        <InvisibleButton
          onPress={() =>
            navigation.navigate('Alterar Município', {
              cityId: city.id,
              onGoBack: () => fetchCity(),
            })
          }
        >
          <Icon name="pencil" size={24} color="#000" />
        </InvisibleButton>
      </DetailsContainer>

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
    </AppContainer>
  );
};

export default CityDetails;
