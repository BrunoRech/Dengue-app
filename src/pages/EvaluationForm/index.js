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

const AgentForm = () => {
  const { post, get } = UseApi();
  const [formData, setFormData] = useState({});
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

  const handleSubmit = async () => {
    const { data } = await post('/avaliacoes', formData);
    if (data) {
      setFormData({});
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
          <ButtonText>Cadastrar</ButtonText>
        </Button>
      </FormContainer>
    </AppContainer>
  );
};

export default AgentForm;
