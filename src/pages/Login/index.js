import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, CheckBox } from 'react-native';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  Button,
  ButtonText,
  CheckBoxContainer,
  FlexContainer,
  FormContainer,
  InputTexto,
  RightFloatLink,
} from '../../styles';

const Login = ({ navigation }) => {
  const { post } = UseApi();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    email: 'email@email.com',
    senha: '123',
  });

  const handleLogin = async () => {
    let data;
    if (isAdmin) {
      const response = await post('/sessoes/coordenadores', formData);
      data = response.data;
    } else {
      const response = await post('/sessoes/agentes', formData);
      data = response.data;
    }
    if (data && data.token) {
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('isAdmin', `${isAdmin}`);
      navigation.navigate('Dashboard');
    }
  };

  return (
    <AppContainer>
      <FlexContainer>
        <FormContainer>
          <InputTexto
            placeholder="E-mail"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={email => setFormData({ ...formData, email })}
            value={formData.email}
          />
          <InputTexto
            autoCapitalize="none"
            autoCorrect={false}
            value={formData.senha}
            placeholder="Senha"
            onChangeText={senha => setFormData({ ...formData, senha })}
            secureTextEntry
          />
          <CheckBoxContainer>
            <CheckBox value={isAdmin} onValueChange={setIsAdmin} />
            <Text>Coordenador</Text>
          </CheckBoxContainer>
        </FormContainer>
        <View>
          <Button onPress={handleLogin}>
            <ButtonText>Entrar</ButtonText>
          </Button>
          <RightFloatLink onPress={() => navigation.navigate('ForgotPass')}>
            <Text>Esqueceu sua Senha?</Text>
          </RightFloatLink>
        </View>
      </FlexContainer>
    </AppContainer>
  );
};

export default Login;
