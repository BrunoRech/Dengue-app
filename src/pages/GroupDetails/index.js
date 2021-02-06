import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  DetailsContainer,
  DetailsText,
  InvisibleButton,
} from '../../styles';

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
          <DetailsText>Nome: {group.nome}</DetailsText>
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
