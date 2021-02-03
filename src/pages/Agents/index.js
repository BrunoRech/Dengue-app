import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList, Text, View } from 'react-native';
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

  useEffect(() => {
    const fetchAgents = async () => {
      const { data } = await get('/agentes');
      setAgents(data);
    };

    fetchAgents();
  }, [get]);

  const renderItem = ({ nome, email, telefone, grupo, id }) => (
    <ListItem key={id}>
      <InvisibleButton
        onPress={() => navigation.navigate('Detalhes Agente', { agentId: id })}
      >
        <Text>{nome}</Text>
        <Text>{email}</Text>
        <Text>{telefone}</Text>
        <Text>{grupo.nome}</Text>
      </InvisibleButton>
    </ListItem>
  );

  return (
    <AppContainer>
      <View>
        <PageHeader>
          <InvisibleButton onPress={() => navigation.navigate('Novo Agente')}>
            <ListTitle>
              Agentes
              <Icon name="plus" size={22} color="#fff" />
            </ListTitle>
          </InvisibleButton>
        </PageHeader>
      </View>
      <FlatList
        data={agents}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => `${item.id}`}
      />
    </AppContainer>
  );
};

export default Agents;
