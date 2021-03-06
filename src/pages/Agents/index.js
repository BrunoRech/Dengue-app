import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert, FlatList, RefreshControl, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  InvisibleButton,
  ListItem,
  PageHeader,
  HeaderButton,
  ListText,
  HeaderButtonText,
  ListTextButton,
} from '../../styles';

const Agents = ({ navigation }) => {
  const { get, destroy } = UseApi();
  const [agents, setAgents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isAdmin, setAdmin] = useState(null);

  const fetchAgents = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get('/agentes');
    setAgents(data);
    setRefreshing(false);
  }, [get]);

  useEffect(() => {
    const getPrivileges = async () => {
      const response = await AsyncStorage.getItem('isAdmin');
      setAdmin(response);
    };
    getPrivileges();
    fetchAgents();
  }, [fetchAgents]);

  const destroyAgent = async id => {
    await destroy(`/agentes/${id}`, '', () => {
      setAgents(agents.filter(agent => agent.id !== id));
    });
  };

  const onDeletePressed = (nome, id) => {
    Alert.alert(
      'Excluir Agente',
      `Você deseja excluir o agente ${nome}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => destroyAgent(id) },
      ],
      { cancelable: false },
    );
  };

  const renderItem = ({ nome, cpf, id }) => (
    <ListItem key={id}>
      <ListTextButton
        onPress={() => navigation.navigate('Detalhes Agente', { agentId: id })}
      >
        <View>
          <ListText>{nome}</ListText>
          <ListText>{cpf}</ListText>
        </View>
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
        <PageHeader>
          {isAdmin === 'true' && (
            <HeaderButton
              onPress={() =>
                navigation.navigate('Novo Agente', {
                  onGoBack: () => fetchAgents(),
                })
              }
            >
              <HeaderButtonText>Novo Agente</HeaderButtonText>
            </HeaderButton>
          )}
          <HeaderButton onPress={() => navigation.navigate('Grupos')}>
            <HeaderButtonText>Grupos</HeaderButtonText>
          </HeaderButton>
        </PageHeader>
      </View>
      <FlatList
        data={agents}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => `${item.id}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchAgents} />
        }
      />
    </AppContainer>
  );
};

export default Agents;
