import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Login,
  ForgotPass,
  Dashboard,
  Agents,
  Evaluations,
  AgentDetails,
  EvaluationDetails,
  AgentForm,
  EvaluationForm,
  Streets,
  StreetForm,
  DistrictForm,
  CityForm,
  StreetDetails,
  GroupForm,
  Groups,
  GroupDetails,
  Districts,
  DistrictDetails,
  Cities,
  CityDetails,
} from './pages';

const Routes = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabStack = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'home';
              break;
            case 'Agentes':
              iconName = 'user';
              break;
            case 'Avaliações':
              iconName = 'book';
              break;
            case 'Endereços':
              iconName = 'map';
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#000',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Agentes" component={Agents} />
      <Tab.Screen name="Avaliações" component={Evaluations} />
      <Tab.Screen name="Endereços" component={Streets} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Esqueci Minha Senha" component={ForgotPass} />
        <Stack.Screen name="Dashboard" component={TabStack} />
        <Stack.Screen name="Alterar Agente" component={AgentForm} />
        <Stack.Screen name="Alterar Avaliação" component={EvaluationForm} />
        <Stack.Screen name="Alterar Grupo" component={GroupForm} />
        <Stack.Screen name="Alterar Bairro" component={DistrictForm} />
        <Stack.Screen name="Alterar Município" component={CityForm} />
        <Stack.Screen name="Alterar Rua" component={StreetForm} />
        <Stack.Screen name="Novo Agente" component={AgentForm} />
        <Stack.Screen name="Nova Avaliação" component={EvaluationForm} />
        <Stack.Screen name="Nova Rua" component={StreetForm} />
        <Stack.Screen name="Novo Bairro" component={DistrictForm} />
        <Stack.Screen name="Novo Município" component={CityForm} />
        <Stack.Screen name="Novo Grupo" component={GroupForm} />
        <Stack.Screen name="Detalhes Agente" component={AgentDetails} />
        <Stack.Screen name="Detalhes Rua" component={StreetDetails} />
        <Stack.Screen name="Detalhes Avaliação" component={EvaluationDetails} />
        <Stack.Screen name="Detalhes Grupo" component={GroupDetails} />
        <Stack.Screen name="Detalhes Bairro" component={DistrictDetails} />
        <Stack.Screen name="Detalhes Município" component={CityDetails} />
        <Stack.Screen name="Grupos" component={Groups} />
        <Stack.Screen name="Bairros" component={Districts} />
        <Stack.Screen name="Municípios" component={Cities} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
