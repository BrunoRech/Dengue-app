import { SafeAreaView, Text, View, Dimensions } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';

export const Title = styled(Text)`
  color: red;
`;

export const AppContainer = styled(SafeAreaView)`
  background-color: #cccc;
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
`;

export const InputTexto = styled(TextInput)`
  background-color: #fff;
  width: ${Dimensions.get('window').width - 50}px;
  margin-bottom: 20px;
`;

export const FormContainer = styled(View)``;

export const FlexContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Button = styled(TouchableOpacity)`
  height: 66px;
  background-color: #000;
  width: ${Dimensions.get('window').width - 50}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled(Text)`
  color: #fff;
  font-weight: 800;
  font-size: 20px;
`;

export const RightFloatLink = styled(TouchableOpacity)``;
