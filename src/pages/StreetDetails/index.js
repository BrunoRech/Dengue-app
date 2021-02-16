import React, { useEffect, useState, useCallback } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import Select from 'react-native-picker-select';
import { ScrollView, View } from 'react-native';
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

const StreetDetails = ({ route, navigation }) => {
  const { get } = UseApi();
  const { streetId } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [street, setStreet] = useState({ bairro: { municipio: {} } });
  const [period, setPeriod] = useState(SEMANAL);
  const [graphData, setGraphData] = useState([]);

  const fetchStreet = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get(`/ruas/${streetId}`);
    if (data) {
      setStreet(data);
    }
    setRefreshing(false);
  }, [get, streetId]);

  useEffect(() => {
    fetchStreet();
  }, [fetchStreet]);

  useEffect(() => {
    const fetchData = async () => {
      setRefreshing(true);
      const { data } = await get(`/ruas/${streetId}/focos`, null, {
        headers: { periodo: period },
      });
      setGraphData(data);
      setRefreshing(false);
    };
    fetchData();
  }, [get, period, streetId]);

  return (
    <AppContainer>
      <ScrollView>
        <Spinner visible={refreshing} textContent="Aguarde..." />
        <DetailsContainer>
          <View>
            <Description name="Nome:" value={street.nome} />
            <Description name="Bairro:" value={street.bairro.nome} />
            <Description
              name="Município:"
              value={street.bairro.municipio.nome}
            />
          </View>
          <InvisibleButton
            onPress={() =>
              navigation.navigate('Alterar Rua', {
                streetId: street.id,
                onGoBack: () => fetchStreet(),
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
      </ScrollView>
    </AppContainer>
  );
};

export default StreetDetails;
