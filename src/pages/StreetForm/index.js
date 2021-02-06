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

const StreetForm = ({ route }) => {
  const { streetId } = route.params || {};
  const { post, get, put } = UseApi();
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
    if (streetId) {
      await put(`/ruas/${streetId}`, formData, oldStreet);
    } else {
      const { data } = await post('/ruas', formData);
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
