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
  HeaderButton,
  HeaderButtonText,
} from '../../styles';

const Streets = ({ navigation }) => {
  const { get, destroy } = UseApi();
  const [streets, setStreets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStreets = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get('/ruas');
    setStreets(data);
    setRefreshing(false);
  }, [get]);

  useEffect(() => {
    fetchStreets();
  }, [fetchStreets]);

  const destroyStreet = async id => {
    await destroy(`/ruas/${id}`, '', () => {
      setStreets(streets.filter(street => street.id !== id));
    });
  };

  const onDeletePressed = (nome, id) => {
    Alert.alert(
      'Excluir Rua',
      `Você deseja a rua ${nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => destroyStreet(id) },
      ],
      { cancelable: false },
    );
  };

  const renderItem = ({ nome, id }) => (
    <ListItem key={id}>
      <InvisibleButton
        onPress={() => navigation.navigate('Detalhes Rua', { streetId: id })}
      >
        <ListText>{nome}</ListText>
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
          <HeaderButton
            onPress={() =>
              navigation.navigate('Nova Rua', {
                onGoBack: () => fetchStreets(),
              })
            }
          >
            <HeaderButtonText>Nova Rua</HeaderButtonText>
          </HeaderButton>
          <HeaderButton onPress={() => navigation.navigate('Bairros')}>
            <HeaderButtonText>Bairros</HeaderButtonText>
          </HeaderButton>
        </PageHeader>
      </View>
      <FlatList
        data={streets}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => `${item.id}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchStreets} />
        }
      />
    </AppContainer>
  );
};

export default Streets;
