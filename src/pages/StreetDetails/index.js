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

const StreetDetails = ({ route, navigation }) => {
  const { get } = UseApi();
  const { streetId } = route.params;
  const [street, setStreet] = useState({ bairro: { municipio: {} } });
  const [option, setOption] = useState(null);

  useEffect(() => {
    const fetchStreet = async () => {
      const { data } = await get(`/ruas/${streetId}`);
      if (data) {
        setStreet(data);
      }
    };
    fetchStreet();
  }, [get, streetId]);

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
            navigation.navigate('Alterar Rua', { streetId: street.id })
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

export default StreetDetails;
