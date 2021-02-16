import React, { useState, useEffect, useCallback } from 'react';
import { Alert, FlatList, RefreshControl, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  InvisibleButton,
  ListItem,
  PageHeader,
  ListText,
  HeaderButtonText,
  HeaderButton,
  ListTextButton,
} from '../../styles';

const Cities = ({ navigation }) => {
  const { get, destroy } = UseApi();
  const [cities, setCities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCities = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get('/municipios');
    setCities(data);
    setRefreshing(false);
  }, [get]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const destroyCity = async id => {
    await destroy(`/municipios/${id}`, '', () => {
      setCities(cities.filter(city => city.id !== id));
    });
  };

  const onDeletePressed = (nome, id) => {
    Alert.alert(
      'Excluir Município',
      `Você deseja o município ${nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => destroyCity(id) },
      ],
      { cancelable: false },
    );
  };

  const renderItem = ({ nome, id }) => (
    <ListItem key={id}>
      <ListTextButton
        onPress={() =>
          navigation.navigate('Detalhes Município', { cityId: id })
        }
      >
        <ListText>{nome}</ListText>
      </ListTextButton>
      <InvisibleButton onPress={() => onDeletePressed(nome, id)}>
        <Icon name="trash" size={24} color="#000" />
      </InvisibleButton>
    </ListItem>
  );

  return (
    <AppContainer>
      <View>
        <PageHeader multi="true">
          <HeaderButton
            onPress={() =>
              navigation.navigate('Novo Município', {
                onGoBack: () => fetchCities(),
              })
            }
          >
            <HeaderButtonText>Novo Município</HeaderButtonText>
          </HeaderButton>
        </PageHeader>
      </View>
      <FlatList
        data={cities}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => `${item.id}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchCities} />
        }
      />
    </AppContainer>
  );
};

export default Cities;
