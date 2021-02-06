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
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Agentes" component={Agents} />
      <Tab.Screen name="Avaliações" component={Evaluations} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="Dashboard" component={TabStack} />
        <Stack.Screen name="Novo Agente" component={AgentForm} />
        <Stack.Screen name="Nova Avaliação" component={EvaluationForm} />
        <Stack.Screen name="Detalhes Agente" component={AgentDetails} />
        <Stack.Screen name="Detalhes Avaliação" component={EvaluationDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
