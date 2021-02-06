import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert, FlatList, RefreshControl, Text, View } from 'react-native';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  ListTitle,
  InvisibleButton,
  ListItem,
  PageHeader,
} from '../../styles';

const Agents = ({ navigation }) => {
  const { get, destroy } = UseApi();
  const [agents, setAgents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAgents = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get('/agentes');
    setAgents(data);
    setRefreshing(false);
  }, [get]);

  useEffect(() => {
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
      <InvisibleButton
        onPress={() => navigation.navigate('Detalhes Agente', { agentId: id })}
      >
        <View>
          <Text>{nome}</Text>
          <Text>{cpf}</Text>
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
        <PageHeader>
          <InvisibleButton onPress={() => navigation.navigate('Novo Agente')}>
            <ListTitle>Novo Agente</ListTitle>
          </InvisibleButton>
          <InvisibleButton onPress={() => navigation.navigate('Grupos')}>
            <ListTitle>Grupos</ListTitle>
          </InvisibleButton>
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
