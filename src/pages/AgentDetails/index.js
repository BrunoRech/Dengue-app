import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { UseApi } from '../../hooks';
import { AppContainer } from '../../styles';

const AgentDetails = ({ route }) => {
  const { get } = UseApi();
  const { agentId } = route.params;
  const [agent, setAgent] = useState({ grupo: {} });

  useEffect(() => {
    const fetchAgent = async () => {
      const { data } = await get(`/agentes/${agentId}`);
      if (data) {
        setAgent(data);
      }
    };
    fetchAgent();
  }, [get, agentId]);

  return (
    <AppContainer>
      <View>
        <Text>{agent.nome}</Text>
        <Text>{agent.email}</Text>
        <Text>{agent.telefone}</Text>
        <Text>{agent.grupo.nome}</Text>
      </View>
    </AppContainer>
  );
};

export default AgentDetails;
