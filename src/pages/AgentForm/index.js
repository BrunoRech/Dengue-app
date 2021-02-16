import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-datepicker';
import Select from 'react-native-picker-select';
import { ScrollView, Text, View } from 'react-native';
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

const AgentForm = ({ route, navigation }) => {
  const { agentId, onGoBack } = route.params || {};
  const { post, get, put } = UseApi();
  const [refreshing, setRefreshing] = useState(false);
  const [formData, setFormData] = useState({});
  const [oldAgent, setOldAgent] = useState({});
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

  useEffect(() => {
    const fetchAgent = async () => {
      const { data } = await get(`/agentes/${agentId}`);
      const oldData = {
        nome: data.nome,
        email: data.email,
        cpf: data.cpf,
        telefone: data.telefone,
        dataIngresso: moment(data.dataIngresso).format('DD/MM/YYYY'),
        dataNascimento: moment(data.dataNascimento).format('DD/MM/YYYY'),
        grupoId: data.grupo.id,
      };
      setFormData(oldData);
      setOldAgent(oldData);
    };
    if (agentId) {
      fetchAgent();
    }
  }, [get, agentId]);

  const handleSubmit = async () => {
    setRefreshing(true);
    if (agentId) {
      const { data } = await put(
        `/agentes/${agentId}`,
        {
          ...formData,
          dataNascimento: moment(formData.dataNascimento, 'DD/MM/YYYY').format(
            'MM/DD/YYYY',
          ),
          dataIngresso: moment(formData.dataIngresso, 'DD/MM/YYYY').format(
            'MM/DD/YYYY',
          ),
        },
        oldAgent,
        `Agente: ${oldAgent.nome} alterado(a) com sucesso`,
      );
      setRefreshing(false);
      if (data) {
        setOldAgent(data);
        onGoBack();
        navigation.goBack();
      }
    } else {
      const { data } = await post(
        '/agentes',
        {
          ...formData,
          dataNascimento: moment(formData.dataNascimento, 'DD/MM/YYYY').format(
            'MM/DD/YYYY',
          ),
          dataIngresso: moment(formData.dataIngresso, 'DD/MM/YYYY').format(
            'MM/DD/YYYY',
          ),
        },
        `Agente: ${formData.nome} criado(a) com sucesso`,
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
            <ButtonText>{agentId ? 'Alterar' : 'Cadastrar'}</ButtonText>
          </Button>
        </FormContainer>
      </ScrollView>
    </AppContainer>
  );
};

export default AgentForm;
