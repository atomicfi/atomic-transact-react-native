import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './navigation/RootNavigator';
import { SettingsProvider } from './state/SettingsContext';
import { EventLogProvider } from './state/EventLogContext';
import { PayLinkProvider } from './state/PayLinkContext';
import { UserLinkProvider } from './state/UserLinkContext';
import { ActionsProvider } from './state/ActionsContext';
import { DataRequestProviderState } from './state/DataRequestContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <EventLogProvider>
          <DataRequestProviderState>
            <PayLinkProvider>
              <UserLinkProvider>
                <ActionsProvider>
                  <NavigationContainer>
                    <StatusBar style="dark" />
                    <RootNavigator />
                  </NavigationContainer>
                </ActionsProvider>
              </UserLinkProvider>
            </PayLinkProvider>
          </DataRequestProviderState>
        </EventLogProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
