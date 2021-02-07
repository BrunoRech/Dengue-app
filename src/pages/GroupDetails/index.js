import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Select from 'react-native-picker-select';
import { View } from 'react-native';
import { UseApi } from '../../hooks';
import { BarChart, Description } from '../../components';
import {
  AppContainer,
  BlackText,
  ChartContainer,
  ChartSelectContainer,
  DetailsContainer,
  FlexContainerMini,
  InvisibleButton,
} from '../../styles';

const GroupDetails = ({ route, navigation }) => {
  const { get } = UseApi();
  const { groupId } = route.params;
  const [group, setGroup] = useState({});
  const [option, setOption] = useState(null);

  useEffect(() => {
    const fetchAgent = async () => {
      const { data } = await get(`/grupos/${groupId}`);
      if (data) {
        setGroup(data);
      }
    };
    fetchAgent();
  }, [get, groupId]);

  return (
    <AppContainer>
      <DetailsContainer>
        <View>
          <Description name="Nome:" value={group.nome} />
        </View>
        <InvisibleButton
          onPress={() =>
            navigation.navigate('Alterar Grupo', { groupId: group.id })
          }
        >
          <Icon name="pencil" size={24} color="#000" />
        </InvisibleButton>
      </DetailsContainer>

      <ChartContainer>
        <FlexContainerMini>
          <BlackText>Histórico de Visitas</BlackText>
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

export default GroupDetails;
