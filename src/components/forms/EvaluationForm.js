import React, { useState } from 'react';
import { UseApi } from '../../hooks';
import { Button, ButtonText, FormContainer, InputTexto } from '../../styles';

const AgentForm = () => {
  const { post } = UseApi();
  const [formData, setFormData] = useState({
    ruaId: 1,
    agenteId: 1,
    morador: 'Jorge',
    focos: '300',
    horario: '15:30',
    numero: '23',
  });

  const handleSubmit = async () => {
    const { data } = await post('/avaliacoes', formData);
    if (data) {
      setFormData({});
    }
  };

  return (
    <FormContainer>
      {/* Agente */}
      <InputTexto
        placeholder="Morador"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={morador => setFormData({ ...formData, morador })}
        value={formData.morador}
      />
      {/* Rua */}
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
        placeholder="Data Nascimento"
        onChangeText={horario => setFormData({ ...formData, horario })}
      />
      <Button onPress={handleSubmit}>
        <ButtonText>Cadastrar</ButtonText>
      </Button>
    </FormContainer>
  );
};

export default AgentForm;
