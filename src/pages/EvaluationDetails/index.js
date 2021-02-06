import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { UseApi } from '../../hooks';
import { AppContainer, DetailsContainer, DetailsText } from '../../styles';

const EvaluationDetails = ({ route }) => {
  const { get } = UseApi();
  const { evaluationId } = route.params;
  const [evaluation, setEvaluation] = useState({
    rua: { bairro: { municipio: {} } },
  });

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
      <DetailsContainer>
        <View>
          <DetailsText>
            Município: {evaluation.rua.bairro.municipio.nome}
          </DetailsText>
          <DetailsText>Bairro: {evaluation.rua.bairro.nome}</DetailsText>
          <DetailsText>Rua: {evaluation.rua.nome}</DetailsText>
          <DetailsText>Número: {evaluation.numero}</DetailsText>
          <DetailsText>Morador: {evaluation.morador}</DetailsText>
          <DetailsText>N° Focos: {evaluation.focos} Focos</DetailsText>
        </View>
      </DetailsContainer>
    </AppContainer>
  );
};

export default EvaluationDetails;
