import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Tabs } from './Tabs';
import CompanyLoginScreen from '../screens/CompanyLoginScreen';
import ActionsJsonEditorScreen from '../screens/ActionsJsonEditorScreen';
import DataRequestProviderScreen from '../screens/DataRequestProviderScreen';
import type { RootStackParamList } from './types';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.card },
      headerTitleStyle: { color: colors.text },
      headerTintColor: colors.accent,
    }}
  >
    <Stack.Screen
      name="Tabs"
      component={Tabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CompanyLogin"
      component={CompanyLoginScreen}
      options={{ title: 'Select Company' }}
    />
    <Stack.Screen
      name="ActionsJsonEditor"
      component={ActionsJsonEditorScreen}
      options={{ title: 'Change Actions' }}
    />
    <Stack.Screen
      name="DataRequestProvider"
      component={DataRequestProviderScreen}
      options={{ title: 'Data Response' }}
    />
  </Stack.Navigator>
);
