import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import { Atomic, Product } from '@atomicfi/transact-react-native';

export default function App() {
  function presentTransact() {
    Atomic.transact({
      config: {
        product: Product.DEPOSIT,
        publicToken: '7YJY7YZT',
      },
      environment: 'http://localhost:4545',
      onInteraction: (interaction: any) => {
        console.log('Interaction event:', JSON.stringify(interaction, null, 2));
      },
      onDataRequest: (request: any) => {
        console.log('Data request event:', request);
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
      id: 'eyJ0eXBlIjoiY2FuY2VsLXBsYW4iLCJmbG93IjoiY2FuY2VsLXBsYW4iLCJwdWJsaWNUb2tlbiI6ImQ0MjRkOWE3LTNlYjItNDUwYi05Y2UyLTEzM2Y1Y2M3ZTI1YiIsImNvbXBhbnlJZCI6IjY1MjlhNmVjY2I4ZTcyMDAwODVjNmVmNiIsImFjY291bnRTdGF0dXMiOiJzdWdnZXN0ZWQifQ==',
      environment: 'http://localhost:4545',
      onLaunch: (data: any) => {
        console.log('Launch event:', data);
      },
      onInteraction: (interaction: any) => {
        console.log('Interaction event:', JSON.stringify(interaction, null, 2));
      },
      onDataRequest: (request: any) => {
        console.log('Data request event:', request);
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
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
