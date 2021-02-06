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

const DistrictForm = () => {
  const { post, get } = UseApi();
  const [formData, setFormData] = useState({});
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      const { data } = await get('/municipios');
      setCities(
        data.map(({ id, nome }) => ({
          label: nome,
          value: id,
          key: id,
        })),
      );
    };
    fetchDistricts();
  }, [get]);

  const handleSubmit = async () => {
    const { data } = await post('/bairros', formData);
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
        <SelectContainer>
          <Select
            value={formData.municipioId}
            onValueChange={municipioId =>
              setFormData({ ...formData, municipioId })
            }
            items={cities}
            placeholder={{
              value: formData.municipioId,
              label: 'Selecione um município',
            }}
          />
        </SelectContainer>
        <Button onPress={handleSubmit}>
          <ButtonText>Cadastrar</ButtonText>
        </Button>
      </FormContainer>
    </AppContainer>
  );
};

export default DistrictForm;
