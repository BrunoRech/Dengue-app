import React, { useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, CheckBox, TouchableOpacity, ScrollView } from 'react-native';
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
} from '../../styles';

const Login = ({ navigation }) => {
  const { post } = UseApi();
  const [isAdmin, setIsAdmin] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    email: 'email@email.com',
    senha: '123',
  });

  const handleLogin = async () => {
    let data;
    setRefreshing(true);
    if (isAdmin) {
      const response = await post('/sessoes/coordenadores', formData);
      data = response.data;
    } else {
      const response = await post('/sessoes/agentes', formData);
      data = response.data;
    }
    if (data && data.token) {
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('userId', `${data.id}`);
      await AsyncStorage.setItem('isAdmin', `${isAdmin}`);
      setRefreshing(false);
      navigation.navigate('Dashboard');
    }
    setRefreshing(false);
  };

  return (
    <AppContainer>
      <ScrollView>
        <FlexContainer>
          <Logo source={mosquitoSvg} />
          <Spinner visible={refreshing} textContent="Aguarde..." />
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
              <FlexContainerMini nopadding>
                <CheckBox value={isAdmin} onValueChange={setIsAdmin} />
                <TouchableOpacity onPress={() => setIsAdmin(!isAdmin)}>
                  <BlackText>Coordenador</BlackText>
                </TouchableOpacity>
              </FlexContainerMini>
            </CheckBoxContainer>
          </View>
          <View>
            <Button onPress={handleLogin}>
              <ButtonText>Entrar</ButtonText>
            </Button>
          </View>
        </FlexContainer>
      </ScrollView>
    </AppContainer>
  );
};

export default Login;
