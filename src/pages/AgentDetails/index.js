import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { View } from 'react-native';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  DetailsContainer,
  DetailsText,
  InvisibleButton,
} from '../../styles';

const AgentDetails = ({ route, navigation }) => {
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
      <DetailsContainer>
        <View>
          <DetailsText>Nome: {agent.nome}</DetailsText>
          <DetailsText>E-mail: {agent.email}</DetailsText>
          <DetailsText>Telefone: {agent.telefone}</DetailsText>
          <DetailsText>Agente: {agent.grupo.nome}</DetailsText>
          <DetailsText>
            Data Nascimento: {moment(agent.dataNascimento).format('DD/MM/YYYY')}
          </DetailsText>
          <DetailsText>
            Data Ingresso: {moment(agent.dataIngresso).format('DD/MM/YYYY')}
          </DetailsText>
        </View>
        <InvisibleButton
          onPress={() =>
            navigation.navigate('Alterar Agente', { agentId: agent.id })
          }
        >
          <Icon name="pencil" size={24} color="#000" />
        </InvisibleButton>
      </DetailsContainer>
    </AppContainer>
  );
};

export default AgentDetails;
