import React, { useEffect, useState, useCallback } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import Select from 'react-native-picker-select';
import { ScrollView, View } from 'react-native';
import { UseApi } from '../../hooks';
import { BarChart, Description } from '../../components';
import { periods, SEMANAL } from '../../utils/constants';
import {
  AppContainer,
  BlackText,
  ChartSelectContainer,
  DetailsContainer,
  FlexContainerMini,
  InvisibleButton,
} from '../../styles';

const DistrictDetails = ({ route, navigation }) => {
  const { get } = UseApi();
  const { districtId } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [district, setDistrict] = useState({ municipio: {} });
  const [period, setPeriod] = useState(SEMANAL);
  const [graphData, setGraphData] = useState([]);

  const fetchDistrict = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get(`/bairros/${districtId}`);
    if (data) {
      setDistrict(data);
    }
    setRefreshing(false);
  }, [get, districtId]);

  useEffect(() => {
    fetchDistrict();
  }, [fetchDistrict]);

  useEffect(() => {
    const fetchData = async () => {
      setRefreshing(true);
      const { data } = await get(`/bairros/${districtId}/focos`, null, {
        headers: { periodo: period },
      });
      setGraphData(data);
      setRefreshing(false);
    };
    fetchData();
  }, [get, period, districtId]);

  return (
    <AppContainer>
      <ScrollView>
        <Spinner visible={refreshing} textContent="Aguarde..." />
        <DetailsContainer>
          <View>
            <Description name="Nome:" value={district.nome} />
            <Description name="Município:" value={district.municipio.nome} />
          </View>
          <InvisibleButton
            onPress={() =>
              navigation.navigate('Alterar Bairro', {
                districtId: district.id,
                onGoBack: () => fetchDistrict(),
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

export default DistrictDetails;
