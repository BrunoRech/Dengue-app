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

const GroupForm = ({ route, navigation }) => {
  const { groupId, onGoBack } = route.params || {};
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
      setRefreshing(false);
      if (data) {
        setOldGroup(data);
        onGoBack();
        navigation.goBack();
      }
    } else {
      const { data } = await post(
        '/grupos',
        formData,
        `Grupo: ${formData.nome} criado com sucesso`,
      );
      setRefreshing(false);
      if (data) {
        setFormData({});
        onGoBack();
        navigation.goBack();
      }
    }
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
