import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { presentTransact, TransactURL } from 'react-native-transact-sdk';

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  React.useEffect(() => {
    presentTransact({
      // sdk parameters
    })
    .then(result => setResult(JSON.stringify(result)))
    .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
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
