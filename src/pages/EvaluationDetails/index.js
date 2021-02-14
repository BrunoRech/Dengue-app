import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import Select from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarChart, Description } from '../../components';
import { periods, SEMANAL } from '../../utils/constants';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  BlackText,
  ChartSelectContainer,
  DetailsContainer,
  FlexContainerMini,
  InvisibleButton,
} from '../../styles';

const EvaluationDetails = ({ route, navigation }) => {
  const { get } = UseApi();
  const { evaluationId } = route.params;
  const [period, setPeriod] = useState(SEMANAL);
  const [graphData, setGraphData] = useState([]);
  const [evaluation, setEvaluation] = useState({
    rua: { bairro: { municipio: {} } },
  });

  const fetchEvaluation = useCallback(async () => {
    const { data } = await get(`/avaliacoes/${evaluationId}`);
    if (data) {
      setEvaluation(data);
    }
  }, [get, evaluationId]);

  useEffect(() => {
    fetchEvaluation();
  }, [fetchEvaluation]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await get(`/ruas/${evaluation.rua.id}/focos`, null, {
        headers: { periodo: period },
      });
      setGraphData(data);
    };
    if (evaluation.rua.id) {
      fetchData();
    }
  }, [get, period, evaluation]);

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
              onGoBack: () => fetchEvaluation(),
            })
          }
        >
          <Icon name="pencil" size={24} color="#000" />
        </InvisibleButton>
      </DetailsContainer>

      <FlexContainerMini>
        <BlackText>Histórico de Focos</BlackText>
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
    </AppContainer>
  );
};

export default EvaluationDetails;
