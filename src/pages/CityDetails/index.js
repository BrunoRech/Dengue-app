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

const CityDetails = ({ route, navigation }) => {
  const { get } = UseApi();
  const { cityId } = route.params;
  const [city, setCity] = useState({});
  const [option, setOption] = useState(null);

  useEffect(() => {
    const fetchCity = async () => {
      const { data } = await get(`/municipios/${cityId}`);
      if (data) {
        setCity(data);
      }
    };
    fetchCity();
  }, [get, cityId]);

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
              value={option}
              onValueChange={value => setOption(value)}
              items={[
                { label: 'nome', value: 1, key: 1 },
                { label: 'nome2', value: 2, key: 2 },
              ]}
              placeholder={{
                value: option,
                label: 'Período',
              }}
            />
          </ChartSelectContainer>
        </FlexContainerMini>
        <BarChart />
      </ChartContainer>
    </AppContainer>
  );
};

export default CityDetails;
