import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-datepicker';
import Select from 'react-native-picker-select';
import { Text, View } from 'react-native';
import moment from 'moment';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  Button,
  ButtonText,
  DatePickerContainer,
  FormContainer,
  InputTexto,
  SelectContainer,
} from '../../styles';

const AgentForm = () => {
  const { post, get } = UseApi();
  const [formData, setFormData] = useState({});
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const { data } = await get('/grupos');
      setGroups(
        data.map(({ id, nome }) => ({ label: nome, value: id, key: id })),
      );
    };
    fetchGroups();
  }, [get]);

  const handleSubmit = async () => {
    const { data } = await post('/agentes', {
      ...formData,
      dataNascimento: moment(formData.dataNascimento, 'DD/MM/YYYY').format(
        'MM/DD/YYYY',
      ),
      dataIngresso: moment(formData.dataIngresso, 'DD/MM/YYYY').format(
        'MM/DD/YYYY',
      ),
      grupoId: 1,
    });
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
          onChangeText={cpf => setFormData({ ...formData, cpf })}
        />
        <InputTexto
          autoCapitalize="none"
          autoCorrect={false}
          value={formData.telefone}
          placeholder="Telefone"
          onChangeText={telefone => setFormData({ ...formData, telefone })}
        />
        <SelectContainer>
          <Select
            value={formData.grupoId}
            onValueChange={grupoId => setFormData({ ...formData, grupoId })}
            items={groups}
            placeholder={{
              value: formData.grupoId,
              label: 'Selecione um grupo',
            }}
          />
        </SelectContainer>
        <DatePickerContainer>
          <View>
            <Text>Data Nascimento</Text>
            <DatePicker
              date={formData.dataNascimento}
              format="DD/MM/YYYY"
              minDate="01/01/2020"
              onDateChange={dataNascimento =>
                setFormData({ ...formData, dataNascimento })
              }
            />
          </View>
          <View>
            <Text>Data Ingresso</Text>
            <DatePicker
              date={formData.dataIngresso}
              format="DD/MM/YYYY"
              minDate="01/01/2020"
              onDateChange={dataIngresso =>
                setFormData({ ...formData, dataIngresso })
              }
            />
          </View>
        </DatePickerContainer>
        <Button onPress={handleSubmit}>
          <ButtonText>Cadastrar</ButtonText>
        </Button>
      </FormContainer>
    </AppContainer>
  );
};

export default AgentForm;
