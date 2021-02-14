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

const DistrictForm = ({ route, navigation }) => {
  const { districtId, onGoBack } = route.params || {};
  const { post, get, put } = UseApi();
  const [refreshing, setRefreshing] = useState(false);
  const [formData, setFormData] = useState({});
  const [oldDistrict, setOldDistrict] = useState({});
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

  useEffect(() => {
    const fetchDistrict = async () => {
      const { data } = await get(`/bairros/${districtId}`);
      const oldData = {
        nome: data.nome,
        municipioId: data.municipio.id,
      };
      setFormData(oldData);
      setOldDistrict(oldData);
    };
    if (districtId) {
      fetchDistrict();
    }
  }, [get, districtId]);

  const handleSubmit = async () => {
    setRefreshing(true);
    if (districtId) {
      const { data } = await put(
        `/bairros/${districtId}`,
        formData,
        oldDistrict,
        `Bairro: ${oldDistrict.nome} alterado com sucesso`,
      );
      setRefreshing(false);
      if (data) {
        setOldDistrict(data);
        navigation.goBack();
        onGoBack();
      }
    } else {
      const { data } = await post(
        '/bairros',
        formData,
        `Bairro: ${formData.nome} criado com sucesso`,
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
          <ButtonText>{districtId ? 'Alterar' : 'Cadastrar'}</ButtonText>
        </Button>
      </FormContainer>
    </AppContainer>
  );
};

export default DistrictForm;
