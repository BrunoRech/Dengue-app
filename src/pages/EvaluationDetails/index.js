import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { UseApi } from '../../hooks';
import { AppContainer } from '../../styles';

const EvaluationDetails = ({ route }) => {
  const { get } = UseApi();
  const { evaluationId } = route.params;
  const [evaluation, setEvaluation] = useState({});

  useEffect(() => {
    const fetchEvaluation = async () => {
      const { data } = await get(`/avaliacoes/${evaluationId}`);
      if (data) {
        setEvaluation(data);
      }
    };
    fetchEvaluation();
  }, [get, evaluationId]);

  return (
    <AppContainer>
      <View>
        <Text>
          {evaluation.rua?.nome} Nº
          {evaluation.numero}
        </Text>
        <Text>{evaluation.rua?.bairro?.nome}</Text>
        <Text>{evaluation.morador}</Text>
        <Text>{evaluation.focos} Focos</Text>
      </View>
    </AppContainer>
  );
};

export default EvaluationDetails;
