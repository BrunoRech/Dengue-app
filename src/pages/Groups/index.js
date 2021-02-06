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

const Groups = ({ navigation }) => {
  const { get, destroy } = UseApi();
  const [groups, setGroups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStreets = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get('/grupos');
    setGroups(data);
    setRefreshing(false);
  }, [get]);

  useEffect(() => {
    fetchStreets();
  }, [fetchStreets]);

  const destroyGroup = async id => {
    await destroy(`/grupos/${id}`, '', () => {
      setGroups(groups.filter(group => group.id !== id));
    });
  };

  const onDeletePressed = (nome, id) => {
    Alert.alert(
      'Excluir Grupo',
      `Você deseja excluir o grupo ${nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => destroyGroup(id) },
      ],
      { cancelable: false },
    );
  };

  const renderItem = ({ nome, id }) => (
    <ListItem key={id}>
      <InvisibleButton
        onPress={() => navigation.navigate('Detalhes Grupo', { groupId: id })}
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
          <InvisibleButton onPress={() => navigation.navigate('Novo Grupo')}>
            <ListTitle>Novo Grupo</ListTitle>
          </InvisibleButton>
        </PageHeader>
      </View>
      <FlatList
        data={groups}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => `${item.id}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchStreets} />
        }
      />
    </AppContainer>
  );
};

export default Groups;
