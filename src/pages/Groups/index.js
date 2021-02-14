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

const Groups = ({ navigation }) => {
  const { get, destroy } = UseApi();
  const [groups, setGroups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchGroups = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get('/grupos');
    setGroups(data);
    setRefreshing(false);
  }, [get]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

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
              navigation.navigate('Novo Grupo', {
                onGoBack: () => fetchGroups(),
              })
            }
          >
            <HeaderButtonText>Novo Grupo</HeaderButtonText>
          </HeaderButton>
        </PageHeader>
      </View>
      <FlatList
        data={groups}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => `${item.id}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchGroups} />
        }
      />
    </AppContainer>
  );
};

export default Groups;
