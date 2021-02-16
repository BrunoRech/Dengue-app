import React, { useEffect, useState, useCallback } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import Select from 'react-native-picker-select';
import { ScrollView, View } from 'react-native';
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
  const [refreshing, setRefreshing] = useState(false);
  const [period, setPeriod] = useState(SEMANAL);
  const [graphData, setGraphData] = useState([]);

  const fetchGroup = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get(`/grupos/${groupId}`);
    if (data) {
      setGroup(data);
    }
    setRefreshing(false);
  }, [get, groupId]);

  useEffect(() => {
    fetchGroup();
  }, [fetchGroup, groupId]);

  useEffect(() => {
    const fetchData = async () => {
      setRefreshing(true);
      const { data } = await get(`/grupos/${groupId}/visitas`, null, {
        headers: { periodo: period },
      });
      setGraphData(data);
      setRefreshing(false);
    };
    fetchData();
  }, [get, period, groupId]);

  return (
    <AppContainer>
      <ScrollView>
        <Spinner visible={refreshing} textContent="Aguarde..." />
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
      </ScrollView>
    </AppContainer>
  );
};

export default GroupDetails;
