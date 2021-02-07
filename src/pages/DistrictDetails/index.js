import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Select from 'react-native-picker-select';
import { View } from 'react-native';
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

const DistrictDetails = ({ route, navigation }) => {
  const { get } = UseApi();
  const { districtId } = route.params;
  const [district, setDistrict] = useState({ municipio: {} });
  const [option, setOption] = useState(null);

  useEffect(() => {
    const fetchDistrict = async () => {
      const { data } = await get(`/bairros/${districtId}`);
      if (data) {
        setDistrict(data);
      }
    };
    fetchDistrict();
  }, [get, districtId]);

  return (
    <AppContainer>
      <DetailsContainer>
        <View>
          <Description name="Nome:" value={district.nome} />
          <Description name="Município:" value={district.municipio.nome} />
        </View>
        <InvisibleButton
          onPress={() =>
            navigation.navigate('Alterar Bairro', { districtId: district.id })
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

export default DistrictDetails;
