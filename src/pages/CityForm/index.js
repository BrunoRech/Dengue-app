import React, { useState, useEffect } from 'react';
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
    if (cityId) {
      await put(`/municipios/${cityId}`, formData, oldCity);
    } else {
      const { data } = await post('/municipios', formData);
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
          <ButtonText>{cityId ? 'Alterar' : 'Cadastrar'}</ButtonText>
        </Button>
      </FormContainer>
    </AppContainer>
  );
};

export default CityForm;
