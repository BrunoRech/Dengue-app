import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
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

const StreetForm = ({ route, navigation }) => {
  const { streetId, onGoBack } = route.params || {};
  const { post, get, put } = UseApi();
  const [refreshing, setRefreshing] = useState(false);
  const [formData, setFormData] = useState({});
  const [oldStreet, setOldStreet] = useState({});
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      const { data } = await get('/bairros');
      setDistricts(
        data.map(({ id, nome, municipio }) => ({
          label: `${nome} - ${municipio.nome}`,
          value: id,
          key: id,
        })),
      );
    };
    fetchDistricts();
  }, [get]);

  useEffect(() => {
    const fetchStreet = async () => {
      const { data } = await get(`/ruas/${streetId}`);
      const oldData = {
        nome: data.nome,
        bairroId: data.bairro.id,
      };
      setFormData(oldData);
      setOldStreet(oldData);
    };
    if (streetId) {
      fetchStreet();
    }
  }, [get, streetId]);

  const handleSubmit = async () => {
    setRefreshing(true);
    if (streetId) {
      const { data } = await put(
        `/ruas/${streetId}`,
        formData,
        oldStreet,
        `Rua: ${oldStreet.nome} alterada com sucesso`,
      );
      setRefreshing(false);
      if (data) {
        navigation.goBack();
        onGoBack();
        setOldStreet(data);
      }
    } else {
      const { data } = await post(
        '/ruas',
        formData,
        `Rua: ${formData.nome} criada com sucesso`,
      );
      setRefreshing(false);
      if (data) {
        setFormData({});
        navigation.goBack();
        onGoBack();
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
        <SelectContainer>
          <Select
            value={formData.bairroId}
            onValueChange={bairroId => setFormData({ ...formData, bairroId })}
            items={districts}
            placeholder={{
              value: formData.bairroId,
              label: 'Selecione um bairro',
            }}
          />
        </SelectContainer>
        <Button onPress={handleSubmit}>
          <ButtonText>{streetId ? 'Alterar' : 'Cadastrar'}</ButtonText>
        </Button>
      </FormContainer>
    </AppContainer>
  );
};

export default StreetForm;
