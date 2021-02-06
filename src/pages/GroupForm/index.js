import React, { useState, useEffect } from 'react';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  Button,
  ButtonText,
  FormContainer,
  InputTexto,
} from '../../styles';

const GroupForm = ({ route }) => {
  const { groupId } = route.params || {};
  const { post, get, put } = UseApi();
  const [formData, setFormData] = useState({});
  const [oldGroup, setOldGroup] = useState({});

  useEffect(() => {
    const fetchGroup = async () => {
      const { data } = await get(`/grupos/${groupId}`);
      setFormData(data);
      setOldGroup(data);
    };
    if (groupId) {
      fetchGroup();
    }
  }, [get, groupId]);

  const handleSubmit = async () => {
    if (groupId) {
      await put(`/grupos/${groupId}`, formData, oldGroup);
    } else {
      const { data } = await post('/grupos', formData);
      if (data) {
        setFormData({});
      }
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
          <ButtonText>{groupId ? 'Alterar' : 'Cadastrar'}</ButtonText>
        </Button>
      </FormContainer>
    </AppContainer>
  );
};

export default GroupForm;
