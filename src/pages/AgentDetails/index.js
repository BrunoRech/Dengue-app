import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Select from 'react-native-picker-select';
import moment from 'moment';
import { ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart, Description } from '../../components';
import { periods, SEMANAL } from '../../utils/constants';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  BlackText,
  ChartSelectContainer,
  DetailsContainer,
  FlexContainerMini,
  InvisibleButton,
} from '../../styles';

const AgentDetails = ({ route, navigation }) => {
  const { get } = UseApi();
  const { agentId } = route.params;
  const [agent, setAgent] = useState({ grupo: {} });
  const [period, setPeriod] = useState(SEMANAL);
  const [graphData, setGraphData] = useState([]);
  const [isAdmin, setAdmin] = useState(null);

  useEffect(() => {
    const getPrivileges = async () => {
      const response = await AsyncStorage.getItem('isAdmin');
      setAdmin(response);
    };
    getPrivileges();
  });

  useEffect(() => {
    const fetchAgent = async () => {
      const { data } = await get(`/agentes/${agentId}`);
      if (data) {
        setAgent(data);
      }
    };
    fetchAgent();
  }, [get, agentId]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await get(`/agentes/${agentId}/visitas`, null, {
        headers: { periodo: period },
      });
      setGraphData(data);
    };
    fetchData();
  }, [get, period, agentId]);

  return (
    <AppContainer>
      <ScrollView>
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
          {isAdmin === 'true' && (
            <InvisibleButton
              onPress={() =>
                navigation.navigate('Alterar Agente', { agentId: agent.id })
              }
            >
              <Icon name="pencil" size={24} color="#000" />
            </InvisibleButton>
          )}
        </DetailsContainer>

        <FlexContainerMini>
          <BlackText>Número de Visitas</BlackText>
          <ChartSelectContainer>
            <Select
              value={period}
              onValueChange={value => setPeriod(value)}
              items={periods}
              placeholder={{
                value: period,
                label: 'Período',
              }}
            />
          </ChartSelectContainer>
        </FlexContainerMini>
        <BarChart data={graphData} />
      </ScrollView>
    </AppContainer>
  );
};

export default AgentDetails;
