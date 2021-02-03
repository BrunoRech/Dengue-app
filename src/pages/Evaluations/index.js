import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList, Text, View } from 'react-native';
import {
  AppContainer,
  InvisibleButton,
  ListItem,
  ListTitle,
  PageHeader,
} from '../../styles';
import { UseApi } from '../../hooks';

const Evaluations = ({ navigation }) => {
  const { get } = UseApi();
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const fetchEvaluations = async () => {
      const { data } = await get('/avaliacoes');
      if (data) {
        setEvaluations(data);
      }
    };

    fetchEvaluations();
  }, [get]);

  const renderItem = ({ id, morador, focos, rua, numero }) => (
    <ListItem key={id}>
      <InvisibleButton
        onPress={() =>
          navigation.navigate('Detalhes Avaliação', { evaluationId: id })
        }
      >
        <Text>
          {rua.nome} Nº
          {numero}
        </Text>
        <Text>{rua.bairro?.nome}</Text>
        <Text>{morador}</Text>
        <Text>{focos} Focos</Text>
      </InvisibleButton>
    </ListItem>
  );

  return (
    <AppContainer>
      <View>
        <PageHeader>
          <InvisibleButton
            onPress={() => navigation.navigate('Nova Avaliação')}
          >
            <ListTitle>
              Avaliações
              <Icon name="plus" size={22} color="#fff" />
            </ListTitle>
          </InvisibleButton>
        </PageHeader>
      </View>
      <FlatList
        data={evaluations}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => `${item.id}`}
      />
    </AppContainer>
  );
};

export default Evaluations;
