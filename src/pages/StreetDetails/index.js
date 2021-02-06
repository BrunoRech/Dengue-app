import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  DetailsContainer,
  DetailsText,
  InvisibleButton,
} from '../../styles';

const StreetDetails = ({ route, navigation }) => {
  const { get } = UseApi();
  const { streetId } = route.params;
  const [street, setStreet] = useState({ bairro: { municipio: {} } });

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
          <DetailsText>Nome: {street.nome}</DetailsText>
          <DetailsText>Bairro: {street.bairro.nome}</DetailsText>
          <DetailsText>Município: {street.bairro.municipio.nome}</DetailsText>
        </View>
        <InvisibleButton
          onPress={() =>
            navigation.navigate('Alterar Rua', { streetId: street.id })
          }
        >
          <Icon name="pencil" size={24} color="#000" />
        </InvisibleButton>
      </DetailsContainer>
    </AppContainer>
  );
};

export default StreetDetails;
