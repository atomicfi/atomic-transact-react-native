import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import { Atomic, Product, Environment } from '@atomicfi/react-native-transact-sdk';

export default function App() {
  function presentTransact() {
    Atomic.transact({
      config: {
        product: Product.DEPOSIT,
        publicToken: "b3807174-a724-46d2-8ba5-d7fd9eb6645d"
      },
      environment: Environment.PRODUCTION,
      onInteraction: interaction => {
        console.log('Interaction event:', interaction)
      },
      onDataRequest: request => {
        console.log('Data request event:', request)
      },
      onFinish: data => {
        console.log('Finish event:', data)
      },
      onClose: data => {
        console.log('Close event:', data)
      }
    })
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={presentTransact}
        title="Launch Transact"
        color="#333333"
      />
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
