import React, { useState, useEffect } from 'react';
import Select from 'react-native-picker-select';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  Button,
  ButtonText,
  FormContainer,
  InputTexto,
  SelectContainer,
} from '../../styles';

const EvaluationForm = ({ route }) => {
  const { evaluationId } = route.params || {};
  const { post, get, put } = UseApi();
  const [formData, setFormData] = useState({});
  const [oldEvaluation, setOldEvaluation] = useState({});
  const [agents, setAgents] = useState([]);
  const [streets, setStreets] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      const { data } = await get('/agentes');
      setAgents(
        data.map(({ id, nome }) => ({ label: nome, value: id, key: id })),
      );
    };

    const fetchStreets = async () => {
      const { data } = await get('/ruas');
      setStreets(
        data.map(({ id, nome }) => ({ label: nome, value: id, key: id })),
      );
    };
    fetchAgents();
    fetchStreets();
  }, [get]);

  useEffect(() => {
    const fetchEvaluation = async () => {
      const { data } = await get(`/avaliacoes/${evaluationId}`);
      const oldData = {
        morador: data.morador,
        focos: `${data.focos}`,
        numero: `${data.numero}`,
        horario: data.horario,
        ruaId: data.rua.id,
        agenteId: data.agente.id,
      };

      setFormData(oldData);
      setOldEvaluation(oldData);
    };
    if (evaluationId) {
      fetchEvaluation();
    }
  }, [get, evaluationId]);

  const handleSubmit = async () => {
    if (evaluationId) {
      await put(`/avaliacoes/${evaluationId}`, formData, oldEvaluation);
    } else {
      const { data } = await post('/avaliacoes', formData);
      if (data) {
        setFormData({});
      }
    }
  };

  return (
    <AppContainer>
      <FormContainer>
        <SelectContainer>
          <Select
            value={formData.agenteId}
            onValueChange={agenteId => setFormData({ ...formData, agenteId })}
            items={agents}
            placeholder={{
              value: formData.agenteId,
              label: 'Selecione o Agente',
            }}
          />
        </SelectContainer>
        <SelectContainer>
          <Select
            value={formData.ruaId}
            onValueChange={ruaId => setFormData({ ...formData, ruaId })}
            items={streets}
            placeholder={{
              value: formData.ruaId,
              label: 'Selecione a Rua',
            }}
          />
        </SelectContainer>
        <InputTexto
          placeholder="Morador"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={morador => setFormData({ ...formData, morador })}
          value={formData.morador}
        />
        <InputTexto
          autoCapitalize="none"
          autoCorrect={false}
          value={formData.numero}
          placeholder="Número Residência"
          onChangeText={numero => setFormData({ ...formData, numero })}
        />
        <InputTexto
          autoCapitalize="none"
          autoCorrect={false}
          value={formData.focos}
          placeholder="Focos"
          onChangeText={focos => setFormData({ ...formData, focos })}
        />
        <InputTexto
          autoCapitalize="none"
          autoCorrect={false}
          value={formData.horario}
          placeholder="Horário"
          onChangeText={horario => setFormData({ ...formData, horario })}
        />
        <Button onPress={handleSubmit}>
          <ButtonText>{evaluationId ? 'Alterar' : 'Cadastrar'}</ButtonText>
        </Button>
      </FormContainer>
    </AppContainer>
  );
};

export default EvaluationForm;
