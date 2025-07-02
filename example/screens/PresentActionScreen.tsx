import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { Atomic, Environment } from '@atomicfi/transact-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'PresentAction'>;

type EnvironmentOption = 'sandbox' | 'production' | 'custom';

const PresentActionScreen: React.FC<Props> = () => {
  const [actionId, setActionId] = useState('');
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<EnvironmentOption>('sandbox');
  const [customUrl, setCustomUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const environmentOptions = [
    { key: 'sandbox' as EnvironmentOption, label: 'Sandbox' },
    { key: 'production' as EnvironmentOption, label: 'Production' },
    { key: 'custom' as EnvironmentOption, label: 'Custom URL' },
  ];

  const getEnvironment = () => {
    switch (selectedEnvironment) {
      case 'sandbox':
        return Environment.sandbox;
      case 'production':
        return Environment.production;
      case 'custom': {
        // Use the custom URL as transactPath and derive apiPath from it
        const baseUrl = customUrl.trim();
        const apiPath = baseUrl
          .replace('/transact', '/api')
          .replace('transact.', 'api.');
        return Environment.custom(baseUrl, apiPath);
      }
      default:
        return Environment.sandbox;
    }
  };

  const presentAction = () => {
    if (!actionId.trim()) {
      Alert.alert('Error', 'Please enter a valid action ID');
      return;
    }

    if (selectedEnvironment === 'custom' && !customUrl.trim()) {
      Alert.alert('Error', 'Please enter a valid custom URL');
      return;
    }

    setIsLoading(true);

    Atomic.presentAction({
      id: actionId.trim(),
      environment: getEnvironment(),
      onLaunch: () => {
        console.log('Action launched');
        Alert.alert('Info', 'Action launched successfully!');
      },
      onFinish: (result: any) => {
        setIsLoading(false);
        console.log('Action finished:', result);
        Alert.alert('Success', 'Action completed successfully!');
      },
      onClose: () => {
        setIsLoading(false);
        console.log('Action closed');
        Alert.alert('Info', 'Action was closed by user');
      },
      onAuthStatusUpdate: (status: any) => {
        console.log('Auth Status Update:', status);
      },
      onTaskStatusUpdate: (status: any) => {
        console.log('Task Status Update:', status);
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Present Action</Text>
        <Text style={styles.headerSubtitle}>
          Launch specific Atomic actions by ID
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Action ID *</Text>
          <TextInput
            style={styles.input}
            value={actionId}
            onChangeText={setActionId}
            placeholder="Enter action ID (e.g., action-123)"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Environment</Text>
          <View style={styles.radioGroup}>
            {environmentOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={styles.radioOption}
                onPress={() => setSelectedEnvironment(option.key)}
              >
                <View style={styles.radioButton}>
                  <View
                    style={[
                      styles.radioButtonInner,
                      selectedEnvironment === option.key &&
                        styles.radioButtonSelected,
                    ]}
                  />
                </View>
                <Text style={styles.radioLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedEnvironment === 'custom' && (
            <TextInput
              style={[styles.input, styles.customUrlInput]}
              value={customUrl}
              onChangeText={setCustomUrl}
              placeholder="Enter custom environment URL"
              placeholderTextColor="#9ca3af"
            />
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How it works</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Present Action allows you to launch specific Atomic actions by their
            ID. This is useful for:
          </Text>
          <Text style={styles.bulletPoint}>
            • Launching pre-configured flows
          </Text>
          <Text style={styles.bulletPoint}>
            • Deep linking to specific actions
          </Text>
          <Text style={styles.bulletPoint}>• Custom user experiences</Text>
          <Text style={styles.bulletPoint}>• Streamlined workflows</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.launchButton, isLoading && styles.disabledButton]}
          onPress={presentAction}
          disabled={isLoading}
        >
          <Text style={styles.launchButtonText}>
            {isLoading ? 'Launching...' : 'Present Action'}
          </Text>
        </TouchableOpacity>
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
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e7ff',
    textAlign: 'center',
  },
  section: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: '#ffffff',
  },
  customUrlInput: {
    marginTop: 12,
  },
  radioGroup: {
    gap: 12,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  radioButtonSelected: {
    backgroundColor: '#3b82f6',
  },
  radioLabel: {
    fontSize: 16,
    color: '#374151',
  },
  switchGroup: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  infoCard: {
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  infoText: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#3730a3',
    marginBottom: 4,
  },
  buttonContainer: {
    padding: 16,
  },
  launchButton: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  launchButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default PresentActionScreen;
