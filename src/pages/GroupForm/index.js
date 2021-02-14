import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
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
  const [refreshing, setRefreshing] = useState(false);
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
    setRefreshing(true);
    if (groupId) {
      const { data } = await put(
        `/grupos/${groupId}`,
        formData,
        oldGroup,
        `Grupo: ${oldGroup.nome} alterado com sucesso`,
      );
      if (data) {
        setOldGroup(data);
      }
    } else {
      const { data } = await post(
        '/grupos',
        formData,
        `Grupo: ${formData.nome} criado com sucesso`,
      );
      if (data) {
        setFormData({});
      }
    }
    setRefreshing(false);
  };

  return (
    <AppContainer>
      <Spinner visible={refreshing} textContent="Aguarde..." />
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
