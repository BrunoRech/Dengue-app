import React from 'react';
import { View } from 'react-native';
import {
  AppContainer,
  Button,
  ButtonText,
  FlexContainer,
  InputTexto,
} from '../../styles';

const ForgotPass = () => {
  return (
    <AppContainer>
      <FlexContainer>
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
