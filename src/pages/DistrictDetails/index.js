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

const DistrictDetails = ({ route, navigation }) => {
  const { get } = UseApi();
  const { districtId } = route.params;
  const [district, setDistrict] = useState({ municipio: {} });

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
          <DetailsText>Nome: {district.nome}</DetailsText>
          <DetailsText>Município: {district.municipio.nome}</DetailsText>
        </View>
        <InvisibleButton
          onPress={() =>
            navigation.navigate('Alterar Bairro', { districtId: district.id })
          }
        >
          <Icon name="pencil" size={24} color="#000" />
        </InvisibleButton>
      </DetailsContainer>
    </AppContainer>
  );
};

export default DistrictDetails;
