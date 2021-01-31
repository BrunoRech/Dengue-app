import React from 'react';
import { View } from 'react-native';
import {
  AppContainer,
  Button,
  ButtonText,
  FlexContainer,
  FormContainer,
  InputTexto,
} from '../../styles';

const Login = () => {
  // const [formData, setFormData] = useState({});

  return (
    <AppContainer>
      <FlexContainer>
        <FormContainer>
          <InputTexto
            placeholder="E-mail"
            autoCapitalize="none"
            autoCorrect={false}
            value=""
          />
        </FormContainer>
        <View>
          <Button onPress={() => {}}>
            <ButtonText>Enviar</ButtonText>
          </Button>
        </View>
      </FlexContainer>
    </AppContainer>
  );
};

export default Login;
