import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Description } from '../../components';
import { UseApi } from '../../hooks';
import { AppContainer, DetailsContainer, InvisibleButton } from '../../styles';

const EvaluationDetails = ({ route, navigation }) => {
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
          <Description
            name="Município:"
            value={evaluation.rua.bairro.municipio.nome}
          />
          <Description name="Bairro:" value={evaluation.rua.bairro.nome} />
          <Description name="Rua:" value={evaluation.rua.nome} />
          <Description name="Número:" value={evaluation.numero} />
          <Description name="Morador:" value={evaluation.morador} />
          <Description name="Nº Focos:" value={evaluation.focos} />
        </View>
        <InvisibleButton
          onPress={() =>
            navigation.navigate('Alterar Avaliação', {
              evaluationId: evaluation.id,
            })
          }
        >
          <Icon name="pencil" size={24} color="#000" />
        </InvisibleButton>
      </DetailsContainer>
    </AppContainer>
  );
};

export default EvaluationDetails;
