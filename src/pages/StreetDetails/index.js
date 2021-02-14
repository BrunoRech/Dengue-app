import React, { useEffect, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Select from 'react-native-picker-select';
import { View } from 'react-native';
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
  const [street, setStreet] = useState({ bairro: { municipio: {} } });
  const [period, setPeriod] = useState(SEMANAL);
  const [graphData, setGraphData] = useState([]);

  const fetchStreet = useCallback(async () => {
    const { data } = await get(`/ruas/${streetId}`);
    if (data) {
      setStreet(data);
    }
  }, [get, streetId]);

  useEffect(() => {
    fetchStreet();
  }, [fetchStreet]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await get(`/ruas/${streetId}/focos`, null, {
        headers: { periodo: period },
      });
      setGraphData(data);
    };
    fetchData();
  }, [get, period, streetId]);

  return (
    <AppContainer>
      <DetailsContainer>
        <View>
          <Description name="Nome:" value={street.nome} />
          <Description name="Bairro:" value={street.bairro.nome} />
          <Description name="Município:" value={street.bairro.municipio.nome} />
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
    </AppContainer>
  );
};

export default StreetDetails;
