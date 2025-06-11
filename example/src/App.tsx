import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import { Atomic, Scope, Environment } from '@atomicfi/transact-react-native';

export default function App() {
  function presentTransact() {
    Atomic.transact({
      config: {
        scope: Scope.USERLINK,
        tasks: [
          {
            operation: 'deposit',
          },
        ],
        theme: { dark: false },
        publicToken: '',
      },
      environment: Environment.production,
      onInteraction: (interaction: any) => {
        console.log('Interaction event:', JSON.stringify(interaction, null, 2));
      },
      onDataRequest: (request: any) => {
        console.log('Data request event:', request);
      },
      onAuthStatusUpdate: (authStatus: any) => {
        console.log('Auth status update event:', authStatus);
      },
      onTaskStatusUpdate: (taskStatus: any) => {
        console.log('Task status update event:', taskStatus);
      },
      onFinish: (data: any) => {
        console.log('Finish event:', data);
      },
      onClose: (data: any) => {
        console.log('Close event:', data);
      },
    });
  }

  function presentAction() {
    Atomic.presentAction({
      id: '',
      environment: Environment.production,
      onLaunch: (data: any) => {
        console.log('Launch event:', data);
      },
      onAuthStatusUpdate: (authStatus: any) => {
        console.log('Auth status update event:', authStatus);
      },
      onTaskStatusUpdate: (taskStatus: any) => {
        console.log('Task status update event:', taskStatus);
      },
      onFinish: (data: any) => {
        console.log('Finish event:', data);
      },
      onClose: (data: any) => {
        console.log('Close event:', data);
      },
    });
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={presentTransact}
        title="Launch Transact"
        color="#333333"
      />
      <Button onPress={presentAction} title="Present Action" color="#333333" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  box: { width: 60, height: 60, marginVertical: 20 },
});
