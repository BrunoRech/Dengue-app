import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AgentForm, EvaluationForm } from './components/forms';
import {
  Login,
  ForgotPass,
  Dashboard,
  Agents,
  Evaluations,
  /*  NewEvaluation, */
  AgentDetails,
  EvaluationDetails,
} from './pages';

const Routes = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabStack = () => (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Agentes" component={Agents} />
      <Tab.Screen name="Avaliações" component={Evaluations} />
      <Tab.Screen name="Nova Avaliação" component={EvaluationForm} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="Dashboard" component={TabStack} />
        <Stack.Screen name="Novo Agente" component={AgentForm} />
        {/*         <Stack.Screen name="Nova Avaliação" component={EvaluationForm} /> */}
        <Stack.Screen name="Detalhes Agente" component={AgentDetails} />
        <Stack.Screen name="Detalhes Avaliação" component={EvaluationDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
