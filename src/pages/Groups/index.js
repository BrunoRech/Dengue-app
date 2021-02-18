import React, { useState, useEffect, useCallback } from 'react';
import { Alert, FlatList, RefreshControl, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  ListTextButton,
} from '../../styles';

const Groups = ({ navigation }) => {
  const { get, destroy } = UseApi();
  const [groups, setGroups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isAdmin, setAdmin] = useState(null);

  const fetchGroups = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get('/grupos');
    setGroups(data);
    setRefreshing(false);
  }, [get]);

  useEffect(() => {
    const getPrivileges = async () => {
      const response = await AsyncStorage.getItem('isAdmin');
      setAdmin(response);
    };
    getPrivileges();
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
      <ListTextButton
        onPress={() => navigation.navigate('Detalhes Grupo', { groupId: id })}
      >
        <ListText>{nome}</ListText>
      </ListTextButton>
      {isAdmin === 'true' && (
        <InvisibleButton onPress={() => onDeletePressed(nome, id)}>
          <Icon name="trash" size={24} color="#000" />
        </InvisibleButton>
      )}
    </ListItem>
  );

  return (
    <AppContainer>
      <View>
        <PageHeader multi="true">
          {isAdmin === 'true' && (
            <HeaderButton
              onPress={() =>
                navigation.navigate('Novo Grupo', {
                  onGoBack: () => fetchGroups(),
                })
              }
            >
              <HeaderButtonText>Novo Grupo</HeaderButtonText>
            </HeaderButton>
          )}
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
