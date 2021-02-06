import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { UseApi } from '../../hooks';
import { AppContainer, DetailsContainer, DetailsText } from '../../styles';

const StreetDetails = ({ route }) => {
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
      </DetailsContainer>
    </AppContainer>
  );
};

export default StreetDetails;
