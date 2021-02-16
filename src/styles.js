import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const ListTitle = styled(Text)`
  width: 100%;
  text-align: center;
  font-size: 18px;
  margin: 10px 0px;
`;

export const BlackText = styled(Text)`
  color: #000;
`;

export const Logo = styled(ImageBackground)`
  width: 200px;
  height: 200px;
  margin: 60px 0px;
`;

export const AppContainer = styled(SafeAreaView)`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
`;

export const InputTexto = styled(TextInput)`
  background-color: #fff;
  width: ${Dimensions.get('window').width - 50}px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 18px;
`;

export const GraphContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 10px;
`;

export const DatePickerContainer = styled(View)`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: ${Dimensions.get('window').width - 50}px;
`;

export const DetailsPropsContainer = styled(View)`
  flex-flow: row;
  margin: 5px 0px;
`;

export const DetailsText = styled(Text)`
  margin: 0px 5px;
  font-size: 18px;
  color: #000;
`;

export const DetailsTitle = styled(DetailsText)`
  font-weight: bold;
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

export const ChartSelectContainer = styled(SelectContainer)`
  width: 210px;
`;

export const CheckBoxContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const FlexContainer = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const FlexContainerMini = styled(FlexContainer)`
  height: auto;
  flex-flow: row;
  justify-content: space-between;
  padding: ${({ nopadding }) => (!nopadding ? '10px' : '0px')};
`;

export const FormContainer = styled(FlexContainer)`
  margin-top: 20px;
  justify-content: flex-start;
`;

export const Button = styled(TouchableOpacity)`
  height: 66px;
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 10px;
  width: ${Dimensions.get('window').width - 50}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ButtonText = styled(Text)`
  color: #000;
  font-weight: bold;
  font-size: 24px;
  text-transform: uppercase;
`;

export const HeaderButtonText = styled(ButtonText)`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
`;

export const ListText = styled(Text)`
  color: #000;
`;

export const HeaderButton = styled(Button)`
  background-color: #000;
  width: 100%;
  padding: 0px 10px;
  height: 40px;
`;

export const InvisibleButton = styled(Button)`
  border: none;
  background-color: transparent;
  width: 100%;
  height: auto;
  margin: 5px 10px;
`;

export const ListItem = styled(View)`
  border: 2px solid #000;
  border-radius: 10px;
  width: auto;
  height: auto;
  background-color: #fff;
  margin: 5px;
  padding: 10px 15px 10px 0px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

export const PageHeader = styled(View)`
  flex-flow: row;
  justify-content: space-between;
  margin: 15px 10px 10px;
`;
