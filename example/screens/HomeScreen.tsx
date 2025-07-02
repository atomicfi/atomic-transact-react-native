import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const showInfo = () => {
    Alert.alert(
      'Atomic Transact SDK',
      'This example app demonstrates the integration of the @atomicfi/transact-react-native package.\n\n' +
        'Features:\n' +
        '• Transact Flow - Complete financial connection flow\n' +
        '• Present Action - Launch specific actions\n' +
        '• Environment switching (Sandbox/Production)\n' +
        '• Custom theming and configuration\n\n' +
        'Note: You need valid Atomic credentials to test the actual flows.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Atomic Transact SDK</Text>
        <Text style={styles.subtitle}>React Native Integration Example</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('Transact')}
        >
          <Text style={styles.buttonText}>Launch Transact Flow</Text>
          <Text style={styles.buttonSubtext}>
            Test the complete financial connection experience
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('PresentAction')}
        >
          <Text style={styles.buttonText}>Present Action</Text>
          <Text style={styles.buttonSubtext}>
            Launch specific actions by ID
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.infoButton]}
          onPress={showInfo}
        >
          <Text style={styles.buttonText}>About This Example</Text>
          <Text style={styles.buttonSubtext}>
            Learn more about the SDK features
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Powered by Atomic Financial • Built with React Native + Expo
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 24,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
  },
  content: {
    padding: 24,
    gap: 16,
  },
  button: {
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryButton: {
    backgroundColor: '#10b981',
  },
  secondaryButton: {
    backgroundColor: '#3b82f6',
  },
  infoButton: {
    backgroundColor: '#6b7280',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  buttonSubtext: {
    fontSize: 14,
    color: '#e5e7eb',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default HomeScreen;
