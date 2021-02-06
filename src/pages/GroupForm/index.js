import React, { useState } from 'react';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  Button,
  ButtonText,
  FormContainer,
  InputTexto,
} from '../../styles';

const GroupForm = () => {
  const { post } = UseApi();
  const [formData, setFormData] = useState({});

  const handleSubmit = async () => {
    const { data } = await post('/grupos', formData);
    if (data) {
      setFormData({});
    }
  };

  return (
    <AppContainer>
      <FormContainer>
        <InputTexto
          placeholder="Nome"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={nome => setFormData({ ...formData, nome })}
          value={formData.nome}
        />
        <Button onPress={handleSubmit}>
          <ButtonText>Cadastrar</ButtonText>
        </Button>
      </FormContainer>
    </AppContainer>
  );
};

export default GroupForm;
