import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  Button,
  ButtonText,
  FlexContainer,
  FormContainer,
  InputTexto,
  RightFloatLink,
} from '../../styles';

const Login = ({ navigation }) => {
  const { post } = UseApi();
  const [formData, setFormData] = useState({});

  const handleLogin = async () => {
    const { data } = await post('/sessoes/coordenadores', formData);
    await AsyncStorage.setItem('token', data.token);
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
