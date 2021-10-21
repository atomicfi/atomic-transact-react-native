import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import { Atomic, TransactURL } from '@atomicfi/react-native-transact-sdk';

export default function App() {
  function presentTransact() {
    Atomic.transact({
      transactConfig: {
        product: "deposit",
        publicToken: "98bb193d-3553-4182-8e13-595edabd1ba3"
      },
      transactURL: TransactURL.Production,
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
