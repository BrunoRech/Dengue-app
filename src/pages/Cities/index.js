import React, { useState, useEffect, useCallback } from 'react';
import { Alert, FlatList, RefreshControl, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  ListTitle,
  InvisibleButton,
  ListItem,
  PageHeader,
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
      <InvisibleButton
        onPress={() =>
          navigation.navigate('Detalhes Município', { cityId: id })
        }
      >
        <Text>{nome}</Text>
      </InvisibleButton>
      <InvisibleButton onPress={() => onDeletePressed(nome, id)}>
        <Icon name="trash" size={24} color="#000" />
      </InvisibleButton>
    </ListItem>
  );

  return (
    <AppContainer>
      <View>
        <PageHeader multi="true">
          <InvisibleButton
            onPress={() => navigation.navigate('Novo Município')}
          >
            <ListTitle>Novo Município</ListTitle>
          </InvisibleButton>
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
