import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView } from 'react-native';
import useApi from '../../hooks/useApi';
import {
  AppContainer,
  Button,
  ButtonText,
  FormContainer,
  InputTexto,
} from '../../styles';

const AdminForm = ({ route, navigation }) => {
  const { get, put } = useApi();
  const { adminId } = route.params || {};
  const [refreshing, setRefreshing] = useState(false);
  const [formData, setFormData] = useState({});
  const [oldAdmin, setOldAdmin] = useState({});

  useEffect(() => {
    const fetchAdmin = async () => {
      setRefreshing(true);
      const { data } = await get(`/coordenadores/${adminId}`);
      setFormData(data);
      setOldAdmin(data);
      setRefreshing(false);
    };
    if (adminId) {
      fetchAdmin();
    }
  }, [get, adminId]);

  const handleSubmit = async () => {
    setRefreshing(true);
    if (adminId) {
      const { data } = await put(
        `/coordenadores/${adminId}`,
        formData,
        oldAdmin,
        `Coordenador: ${oldAdmin.nome} alterado(a) com sucesso`,
      );
      setRefreshing(false);
      if (data) {
        setOldAdmin(data);
        navigation.goBack();
      }
    }
  };

  return (
    <AppContainer>
      <ScrollView>
        <Spinner visible={refreshing} textContent="Aguarde..." />
        <FormContainer>
          <InputTexto
            placeholder="Nome"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={nome => setFormData({ ...formData, nome })}
            value={formData.nome}
          />
          <InputTexto
            autoCapitalize="none"
            autoCorrect={false}
            value={formData.senha}
            placeholder="Senha"
            onChangeText={senha => setFormData({ ...formData, senha })}
          />
          <InputTexto
            autoCapitalize="none"
            autoCorrect={false}
            value={formData.email}
            placeholder="E-mail"
            onChangeText={email => setFormData({ ...formData, email })}
          />
          <InputTexto
            autoCapitalize="none"
            autoCorrect={false}
            value={formData.cpf}
            placeholder="CPF"
            onChangeText={cpf =>
              setFormData({
                ...formData,
                cpf: cpf
                  .replace(/[^\d]/g, '')
                  .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
                  .substr(0, 14),
              })
            }
          />
          <InputTexto
            autoCapitalize="none"
            autoCorrect={false}
            value={formData.telefone}
            placeholder="Telefone"
            onChangeText={telefone => setFormData({ ...formData, telefone })}
          />

          <Button onPress={handleSubmit}>
            <ButtonText>{adminId ? 'Alterar' : 'Cadastrar'}</ButtonText>
          </Button>
        </FormContainer>
      </ScrollView>
    </AppContainer>
  );
};

export default AdminForm;
