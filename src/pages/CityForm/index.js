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

const CityForm = ({ route }) => {
  const { cityId } = route.params || {};
  const { post, put, get } = UseApi();
  const [refreshing, setRefreshing] = useState(false);
  const [formData, setFormData] = useState({});
  const [oldCity, setOldCity] = useState({});

  useEffect(() => {
    const fetchCity = async () => {
      const { data } = await get(`/municipios/${cityId}`);
      setFormData(data);
      setOldCity(data);
    };
    if (cityId) {
      fetchCity();
    }
  }, [get, cityId]);

  const handleSubmit = async () => {
    setRefreshing(true);
    if (cityId) {
      const { data } = await put(
        `/municipios/${cityId}`,
        formData,
        oldCity,
        `Município: ${oldCity.nome} alterado com sucesso`,
      );
      if (data) {
        setFormData(data);
      }
    } else {
      const { data } = await post(
        '/municipios',
        formData,
        `Município: ${formData.nome} criado com sucesso`,
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
          <ButtonText>{cityId ? 'Alterar' : 'Cadastrar'}</ButtonText>
        </Button>
      </FormContainer>
    </AppContainer>
  );
};

export default CityForm;
