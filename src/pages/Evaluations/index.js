import React, { useState, useEffect, useCallback } from 'react';
import { Alert, FlatList, RefreshControl, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  InvisibleButton,
  ListItem,
  ListTitle,
  PageHeader,
} from '../../styles';

const Evaluations = ({ navigation }) => {
  const { get, destroy } = UseApi();
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

  const destroyEvaluation = async id => {
    await destroy(`/avaliacoes/${id}`, '', () => {
      setEvaluations(evaluations.filter(evaluation => evaluation.id !== id));
    });
  };

  const onDeletePressed = (rua, numero, id) => {
    Alert.alert(
      'Excluir Avaliação',
      `Você deseja excluir a avaliação da rua: ${rua}, Nº ${numero}? ?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => destroyEvaluation(id) },
      ],
      { cancelable: false },
    );
  };

  const renderItem = ({ id, focos, rua, numero }) => (
    <ListItem key={id}>
      <InvisibleButton
        onPress={() =>
          navigation.navigate('Detalhes Avaliação', { evaluationId: id })
        }
      >
        <View>
          <Text>
            {rua.nome} Nº
            {numero}
          </Text>
          <Text>{focos} Focos</Text>
        </View>
      </InvisibleButton>
      <InvisibleButton onPress={() => onDeletePressed(rua.nome, numero, id)}>
        <Icon name="trash" size={24} color="#000" />
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
