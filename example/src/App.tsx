import * as React from 'react'

import { StyleSheet, View, Button } from 'react-native'
import { Atomic, Product, Environment } from '@atomicfi/transact-react-native'

export default function App() {
  function presentTransact() {
    Atomic.transact({
      config: {
        product: Product.DEPOSIT,
        publicToken: 'bbb4d921-f61f-42e7-b10b-0caac8630838'
      },
      environment: Environment.PRODUCTION,
      onInteraction: (interaction) => {
        console.log('Interaction event:', interaction)
      },
      onDataRequest: (request) => {
        console.log('Data request event:', request)
      },
      onFinish: (data) => {
        console.log('Finish event:', data)
      },
      onClose: (data) => {
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20
  }
})
