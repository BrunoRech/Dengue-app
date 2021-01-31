import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Login,
  ForgotPass,
  Dashboard,
  Agents,
  Evaluations,
  NewEvaluation,
} from './pages';

const Routes = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabStack = () => (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Agentes" component={Agents} />
      <Tab.Screen name="Avaliações" component={Evaluations} />
      <Tab.Screen name="Nova Avaliação" component={NewEvaluation} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="Dashboard" component={TabStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
