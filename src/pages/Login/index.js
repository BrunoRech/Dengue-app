import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, CheckBox, TouchableOpacity } from 'react-native';
import mosquitoSvg from '../../assets/images/mosquito.png';
import { UseApi } from '../../hooks';
import {
  AppContainer,
  BlackText,
  Button,
  ButtonText,
  CheckBoxContainer,
  FlexContainer,
  FlexContainerMini,
  InputTexto,
  Logo,
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
        <Logo source={mosquitoSvg} />
        <View>
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
            <FlexContainerMini>
              <CheckBox value={isAdmin} onValueChange={setIsAdmin} />
              <TouchableOpacity onPress={() => setIsAdmin(!isAdmin)}>
                <BlackText>Coordenador</BlackText>
              </TouchableOpacity>
            </FlexContainerMini>
            <RightFloatLink
              onPress={() => navigation.navigate('Esqueci Minha Senha')}
            >
              <BlackText>Esqueceu sua Senha?</BlackText>
            </RightFloatLink>
          </CheckBoxContainer>
        </View>
        <View>
          <Button onPress={handleLogin}>
            <ButtonText>Entrar</ButtonText>
          </Button>
        </View>
      </FlexContainer>
    </AppContainer>
  );
};

export default Login;
