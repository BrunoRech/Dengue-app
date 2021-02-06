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

const Districts = ({ navigation }) => {
  const { get, destroy } = UseApi();
  const [districts, setDistricts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDistricts = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get('/bairros');
    setDistricts(data);
    setRefreshing(false);
  }, [get]);

  useEffect(() => {
    fetchDistricts();
  }, [fetchDistricts]);

  const destroyDistrict = async id => {
    await destroy(`/bairros/${id}`, '', () => {
      setDistricts(districts.filter(district => district.id !== id));
    });
  };

  const onDeletePressed = (nome, id) => {
    Alert.alert(
      'Excluir Bairro',
      `Você deseja o bairro ${nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => destroyDistrict(id) },
      ],
      { cancelable: false },
    );
  };

  const renderItem = ({ nome, municipio, id }) => (
    <ListItem key={id}>
      <InvisibleButton
        onPress={() =>
          navigation.navigate('Detalhes Bairro', { districtId: id })
        }
      >
        <View>
          <Text>{nome}</Text>
          <Text>{municipio.nome}</Text>
        </View>
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
          <InvisibleButton onPress={() => navigation.navigate('Novo Bairro')}>
            <ListTitle>Novo Bairro</ListTitle>
          </InvisibleButton>
          <InvisibleButton onPress={() => navigation.navigate('Municípios')}>
            <ListTitle>Municípios</ListTitle>
          </InvisibleButton>
        </PageHeader>
      </View>
      <FlatList
        data={districts}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => `${item.id}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchDistricts} />
        }
      />
    </AppContainer>
  );
};

export default Districts;
