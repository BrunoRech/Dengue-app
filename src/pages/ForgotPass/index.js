import React from 'react';
import { View } from 'react-native';
import mosquitoSvg from '../../assets/images/mosquito.png';
import {
  AppContainer,
  Button,
  ButtonText,
  FlexContainer,
  InputTexto,
  Logo,
} from '../../styles';

const ForgotPass = () => {
  return (
    <AppContainer>
      <FlexContainer>
        <Logo source={mosquitoSvg} />
        <View>
          <InputTexto
            placeholder="E-mail"
            autoCapitalize="none"
            autoCorrect={false}
            value=""
          />
        </View>
        <View>
          <Button onPress={() => {}}>
            <ButtonText>Enviar</ButtonText>
          </Button>
        </View>
      </FlexContainer>
    </AppContainer>
  );
};

export default ForgotPass;
