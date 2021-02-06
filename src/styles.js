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
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
`;

export const InputTexto = styled(TextInput)`
  background-color: #fff;
  width: ${Dimensions.get('window').width - 50}px;
  margin-bottom: 20px;
`;

export const DatePickerContainer = styled(View)`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: ${Dimensions.get('window').width - 50}px;
`;

export const DetailsText = styled(Text)`
  margin: 10px;
  font-size: 18px;
`;

export const DetailsContainer = styled(View)`
  margin: 10px 0px;
  padding: 0px 15px;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  justify-content: space-between;
  flex-direction: row;
  display: flex;
`;

export const SelectContainer = styled(View)`
  background-color: #fff;
  width: ${Dimensions.get('window').width - 50}px;
  margin-bottom: 20px;
`;

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

export const FormContainer = styled(FlexContainer)`
  margin-top: 20px;
  justify-content: flex-start;
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
  margin: 5px 10px;
`;

export const ListItem = styled(View)`
  border-radius: 10px;
  width: 100%;
  height: auto;
  background-color: #fff;
  margin: 5px;
  padding: 10px;
`;

export const ButtonText = styled(Text)`
  color: #fff;
  font-weight: 800;
  font-size: 20px;
`;

export const PageHeader = styled(View)`
  flex-flow: row;
  justify-content: center;
  margin: 5px 10px;
`;

export const RightFloatLink = styled(TouchableOpacity)``;
