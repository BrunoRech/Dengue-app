import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { View } from 'react-native';
import { UseApi } from '../../hooks';
import { AppContainer, DetailsContainer, InvisibleButton } from '../../styles';
import { Description } from '../../components';

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
          <Description name="Nome:" value={agent.nome} />
          <Description name="E-mail:" value={agent.email} />
          <Description name="Telefone:" value={agent.telefone} />
          <Description name="Agente:" value={agent.grupo.nome} />
          <Description
            name="Data de Nascimento:"
            value={moment(agent.dataNascimento).format('DD/MM/YYYY')}
          />
          <Description
            name="Data de Ingresso:"
            value={moment(agent.dataIngresso).format('DD/MM/YYYY')}
          />
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
