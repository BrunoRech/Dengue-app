import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import { UseApi } from '../../hooks';
import { Description } from '../../components';
import { AppContainer, DetailsContainer, InvisibleButton } from '../../styles';

const GroupDetails = ({ route, navigation }) => {
  const { get } = UseApi();
  const { groupId } = route.params;
  const [group, setGroup] = useState({});

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
    </AppContainer>
  );
};

export default GroupDetails;
