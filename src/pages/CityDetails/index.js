import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import { UseApi } from '../../hooks';
import { AppContainer, DetailsContainer, InvisibleButton } from '../../styles';
import { Description } from '../../components';

const CityDetails = ({ route, navigation }) => {
  const { get } = UseApi();
  const { cityId } = route.params;
  const [city, setCity] = useState({});

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
    </AppContainer>
  );
};

export default CityDetails;
