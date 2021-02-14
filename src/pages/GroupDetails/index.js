import React, { useEffect, useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Select from 'react-native-picker-select';
import { View } from 'react-native';
import { UseApi } from '../../hooks';
import { BarChart, Description } from '../../components';
import { periods, SEMANAL } from '../../utils/constants';
import {
  AppContainer,
  BlackText,
  ChartSelectContainer,
  DetailsContainer,
  FlexContainerMini,
  InvisibleButton,
} from '../../styles';

const GroupDetails = ({ route, navigation }) => {
  const { get } = UseApi();
  const { groupId } = route.params;
  const [group, setGroup] = useState({});
  const [period, setPeriod] = useState(SEMANAL);
  const [graphData, setGraphData] = useState([]);

  const fetchGroup = useCallback(async () => {
    const { data } = await get(`/grupos/${groupId}`);
    if (data) {
      setGroup(data);
    }
  }, [get, groupId]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup, groupId]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await get(`/grupos/${groupId}/visitas`, null, {
        headers: { periodo: period },
      });
      setGraphData(data);
    };
    fetchData();
  }, [get, period, groupId]);

  return (
    <AppContainer>
      <DetailsContainer>
        <View>
          <Description name="Nome:" value={group.nome} />
        </View>
        <InvisibleButton
          onPress={() =>
            navigation.navigate('Alterar Grupo', {
              onGoBack: () => fetchGroup(),
              groupId: group.id,
            })
          }
        >
          <Icon name="pencil" size={24} color="#000" />
        </InvisibleButton>
      </DetailsContainer>

      <FlexContainerMini>
        <BlackText>Histórico de Visitas</BlackText>
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
    </AppContainer>
  );
};

export default GroupDetails;
