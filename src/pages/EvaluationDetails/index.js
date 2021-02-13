import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Select from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarChart, Description } from '../../components';
import { periods, SEMANAL } from '../../utils/constants';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  BlackText,
  ChartContainer,
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

  useEffect(() => {
    const fetchEvaluation = async () => {
      const { data } = await get(`/avaliacoes/${evaluationId}`);
      if (data) {
        setEvaluation(data);
      }
    };
    fetchEvaluation();
  }, [get, evaluationId]);

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
            })
          }
        >
          <Icon name="pencil" size={24} color="#000" />
        </InvisibleButton>
      </DetailsContainer>

      <ChartContainer>
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
      </ChartContainer>
    </AppContainer>
  );
};

export default EvaluationDetails;
