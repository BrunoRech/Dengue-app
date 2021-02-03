import { SafeAreaView, Text, View, Dimensions } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const ListTitle = styled(Text)`
  width: 100%;
  text-align: center;
  font-size: 18px;
  margin: 10px 0px;
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

export const CheckBoxContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  display: flex;
`;

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

export const InvisibleButton = styled(Button)`
  background-color: transparent;
  width: 100%;
  height: auto;
`;

export const ListItem = styled(View)`
  border-radius: 10px;
  width: 100%;
  height: 100px;
  background-color: #fff;
  margin: 5px;
  padding: 10px;
`;

export const ButtonText = styled(Text)`
  color: #fff;
  font-weight: 800;
  font-size: 20px;
`;

export const PageHeader = styled(View)``;

export const RightFloatLink = styled(TouchableOpacity)``;
