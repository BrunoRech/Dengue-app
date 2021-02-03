import React, { useState } from 'react';
import { UseApi } from '../../hooks';
import { Button, ButtonText, FormContainer, InputTexto } from '../../styles';

const AgentForm = () => {
  const { post } = UseApi();
  const [formData, setFormData] = useState({
    /*  nome: 'Agente 1',
    grupoId: 1,
    senha: '1123',
    email: 'email@email.com',
    telefone: '828281-82828',
    dataNascimento:
      'Sat Jan 09 2021 15:56:59 GMT-0300 (Horário Padrão de Brasília)',
    dataIngresso:
      'Sat Jan 09 2021 15:56:59 GMT-0300 (Horário Padrão de Brasília)', */
  });

  const handleSubmit = async () => {
    const { data, error } = await post('/agentes', {
      ...formData,
      grupoId: 1,
      dataNascimento: new Date(formData.dataNascimento),
      dataIngresso: new Date(formData.dataIngresso),
    });
    console.log(data, error);
    if (data) {
      setFormData({});
    }
  };

  return (
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
      <InputTexto
        autoCapitalize="none"
        autoCorrect={false}
        value={formData.dataNascimento}
        placeholder="Data Nascimento"
        onChangeText={dataNascimento =>
          setFormData({ ...formData, dataNascimento })
        }
      />
      <InputTexto
        autoCapitalize="none"
        autoCorrect={false}
        value={formData.dataIngresso}
        placeholder="Data Ingresso"
        onChangeText={dataIngresso =>
          setFormData({ ...formData, dataIngresso })
        }
      />
      <Button onPress={handleSubmit}>
        <ButtonText>Cadastrar</ButtonText>
      </Button>
    </FormContainer>
  );
};

export default AgentForm;
