import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  InvisibleButton,
  ListItem,
  ListTitle,
  PageHeader,
} from '../../styles';

const Evaluations = ({ navigation }) => {
  const { get } = UseApi();
  const [evaluations, setEvaluations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvaluations = useCallback(async () => {
    setRefreshing(true);
    const { data } = await get('/avaliacoes');
    if (data) {
      setEvaluations(data);
    }
    setRefreshing(false);
  }, [get]);

  useEffect(() => {
    fetchEvaluations();
  }, [fetchEvaluations]);

  const renderItem = ({ id, focos, rua, numero }) => (
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
            <ListTitle>Nova Avaliação</ListTitle>
          </InvisibleButton>
        </PageHeader>
      </View>
      <FlatList
        data={evaluations}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => `${item.id}`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchEvaluations}
          />
        }
      />
    </AppContainer>
  );
};

export default Evaluations;
