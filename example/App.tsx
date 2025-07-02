import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import TransactScreen from './screens/TransactScreen';
import PresentActionScreen from './screens/PresentActionScreen';

export type RootStackParamList = {
  Home: undefined;
  Transact: undefined;
  PresentAction: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6366f1',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Atomic Transact Example' }}
          />
          <Stack.Screen
            name="Transact"
            component={TransactScreen}
            options={{ title: 'Transact Demo' }}
          />
          <Stack.Screen
            name="PresentAction"
            component={PresentActionScreen}
            options={{ title: 'Present Action Demo' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
