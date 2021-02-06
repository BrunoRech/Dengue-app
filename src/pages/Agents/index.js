import React, { useState, useEffect, useCallback } from 'react';

import { FlatList, RefreshControl, Text, View } from 'react-native';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  ListTitle,
  InvisibleButton,
  ListItem,
  PageHeader,
} from '../../styles';

const Agents = ({ navigation }) => {
  const { get } = UseApi();
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

  const renderItem = ({ nome, cpf, id }) => (
    <ListItem key={id}>
      <InvisibleButton
        onPress={() => navigation.navigate('Detalhes Agente', { agentId: id })}
      >
        <Text>{nome}</Text>
        <Text>{cpf}</Text>
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
