import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Select from 'react-native-picker-select';
import moment from 'moment';
import { View } from 'react-native';
import { BarChart, Description } from '../../components';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  BlackText,
  ChartContainer,
  ChartSelectContainer,
  DetailsContainer,
  FlexContainerMini,
  InvisibleButton,
} from '../../styles';

const AgentDetails = ({ route, navigation }) => {
  const { get } = UseApi();
  const { agentId } = route.params;
  const [agent, setAgent] = useState({ grupo: {} });
  const [option, setOption] = useState(null);

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
          <Description name="CPF:" value={agent.cpf} />
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

      <ChartContainer>
        <FlexContainerMini>
          <BlackText>Número de Visitas</BlackText>
          <ChartSelectContainer>
            <Select
              value={option}
              onValueChange={value => setOption(value)}
              items={[
                { label: 'nome', value: 1, key: 1 },
                { label: 'nome2', value: 2, key: 2 },
              ]}
              placeholder={{
                value: option,
                label: 'Período',
              }}
            />
          </ChartSelectContainer>
        </FlexContainerMini>
        <BarChart />
      </ChartContainer>
    </AppContainer>
  );
};

export default AgentDetails;
