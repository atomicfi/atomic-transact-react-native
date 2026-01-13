import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Platform,
  Switch,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import {
  Atomic,
  Environment,
  PresentationStyles,
} from '@atomicfi/transact-react-native';
import type { PresentationStyleIOS } from '@atomicfi/transact-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'PresentAction'>;

type EnvironmentOption = 'sandbox' | 'production' | 'custom';

const PresentActionScreen: React.FC<Props> = () => {
  const [actionId, setActionId] = useState('');
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<EnvironmentOption>('sandbox');
  const [customTransactPath, setCustomTransactPath] = useState('');
  const [customApiPath, setCustomApiPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [presentationStyleIOS, setPresentationStyleIOS] =
    useState<PresentationStyleIOS>(PresentationStyles.formSheet);
  const [debugEnabled, setDebugEnabled] = useState(false);

  const environmentOptions = [
    { key: 'sandbox' as EnvironmentOption, label: 'Sandbox' },
    { key: 'production' as EnvironmentOption, label: 'Production' },
    { key: 'custom' as EnvironmentOption, label: 'Custom URL' },
  ];

  const presentationStyleOptions: {
    key: PresentationStyleIOS;
    label: string;
  }[] = [
    { key: PresentationStyles.formSheet, label: 'Form Sheet' },
    { key: PresentationStyles.fullScreen, label: 'Full Screen' },
  ];

  const getEnvironment = () => {
    switch (selectedEnvironment) {
      case 'sandbox':
        return Environment.sandbox;
      case 'production':
        return Environment.production;
      case 'custom': {
        const transactPath = customTransactPath.trim();
        const apiPath = customApiPath.trim();
        return Environment.custom(transactPath, apiPath);
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

    if (
      selectedEnvironment === 'custom' &&
      (!customTransactPath.trim() || !customApiPath.trim())
    ) {
      Alert.alert(
        'Error',
        'Please enter both transact path and API path for custom environment'
      );
      return;
    }

    setIsLoading(true);

    Atomic.presentAction({
      id: actionId.trim(),
      environment: getEnvironment(),
      presentationStyleIOS,
      setDebug: debugEnabled,
      onLaunch: () => {
        console.log('Action launched');
        setIsLoading(false);
      },
      onFinish: (result: any) => {
        setIsLoading(false);
        console.log('Action finished:', result);
      },
      onClose: () => {
        setIsLoading(false);
        console.log('Action closed');
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
            <>
              <TextInput
                style={[styles.input, styles.customUrlInput]}
                value={customTransactPath}
                onChangeText={setCustomTransactPath}
                placeholder="Enter custom transact path"
                placeholderTextColor="#9ca3af"
              />
              <TextInput
                style={[styles.input, styles.customUrlInput]}
                value={customApiPath}
                onChangeText={setCustomApiPath}
                placeholder="Enter custom API path"
                placeholderTextColor="#9ca3af"
              />
            </>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Debug Mode</Text>
        <View style={styles.switchGroup}>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Off</Text>
            <Switch
              value={debugEnabled}
              onValueChange={setDebugEnabled}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor="#fff"
            />
            <Text style={styles.switchLabel}>On</Text>
          </View>
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

      {Platform.OS === 'ios' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>iOS Presentation Style</Text>
          <View style={styles.optionGrid}>
            {presentationStyleOptions.map((style) => (
              <TouchableOpacity
                key={style.key}
                style={[
                  styles.optionButton,
                  presentationStyleIOS === style.key && styles.selectedOption,
                ]}
                onPress={() => setPresentationStyleIOS(style.key)}
              >
                <Text
                  style={[
                    styles.optionText,
                    presentationStyleIOS === style.key &&
                      styles.selectedOptionText,
                  ]}
                >
                  {style.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

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
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
  },
  selectedOption: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  optionText: {
    fontSize: 14,
    color: '#6b7280',
  },
  selectedOptionText: {
    color: '#ffffff',
  },
});

export default PresentActionScreen;
