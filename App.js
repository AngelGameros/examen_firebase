// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './screens/AuthScreen';
import UserListScreen from './screens/UserListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Autenticación' }} />
        <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'Lista de Usuarios' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
