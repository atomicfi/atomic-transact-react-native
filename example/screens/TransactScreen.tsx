import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  TextInput,
  Platform,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import {
  Atomic,
  Product,
  Scope,
  Environment,
  PresentationStyles,
  Step,
} from '@atomicfi/transact-react-native';
import type {
  PresentationStyleIOS,
  StepType,
} from '@atomicfi/transact-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Transact'>;

type EnvironmentOption = 'sandbox' | 'production' | 'custom';

const TransactScreen: React.FC<Props> = () => {
  const [publicToken, setPublicToken] = useState('');
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<EnvironmentOption>('sandbox');
  const [customTransactPath, setCustomTransactPath] = useState('');
  const [customApiPath, setCustomApiPath] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(Product.DEPOSIT);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [presentationStyleIOS, setPresentationStyleIOS] =
    useState<PresentationStyleIOS>(PresentationStyles.formSheet);
  const [useDeeplink, setUseDeeplink] = useState(false);
  const [deeplinkCompanyId, setDeeplinkCompanyId] = useState('');
  const [singleSwitch, setSingleSwitch] = useState(false);
  const [deeplinkStep, setDeeplinkStep] = useState<StepType>(
    Step.LOGIN_COMPANY
  );
  const [debugEnabled, setDebugEnabled] = useState(false);

  const products = [
    { key: Product.DEPOSIT, label: 'Deposit' },
    { key: Product.PRESENT, label: 'Present' },
    { key: Product.SWITCH, label: 'Switch' },
  ];

  const getScope = () => {
    // Deposit uses USERLINK, Present and Switch use PAYLINK
    return selectedProduct === Product.DEPOSIT ? Scope.USERLINK : Scope.PAYLINK;
  };

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

  const launchTransact = () => {
    if (!publicToken.trim()) {
      Alert.alert('Error', 'Please enter a valid public token');
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

    // Company ID is only required for steps that target a specific company (not search)
    const requiresCompanyId =
      deeplinkStep !== Step.SEARCH_COMPANY &&
      deeplinkStep !== Step.SEARCH_PAYROLL;
    if (useDeeplink && requiresCompanyId && !deeplinkCompanyId.trim()) {
      Alert.alert('Error', 'Please enter a Company ID when using deeplink');
      return;
    }

    setIsLoading(true);

    const config: any = {
      publicToken: publicToken.trim(),
      scope: getScope(),
      tasks: [
        {
          operation: selectedProduct,
        },
      ],
    };

    // Add deeplink configuration if enabled
    if (useDeeplink) {
      config.deeplink = {
        step: deeplinkStep,
        ...(deeplinkCompanyId.trim() && {
          companyId: deeplinkCompanyId.trim(),
        }),
        singleSwitch: singleSwitch,
      };
    }

    Atomic.transact({
      config,
      environment: getEnvironment(),
      presentationStyleIOS,
      setDebug: debugEnabled,
      onInteraction: (interaction: any) => {
        console.log('Interaction:', interaction);
      },
      onDataRequest: (data: any) => {
        console.log('Data Request:', data);
      },
      onAuthStatusUpdate: (status: any) => {
        console.log('Auth Status Update:', status);
      },
      onTaskStatusUpdate: (status: any) => {
        console.log('Task Status Update:', status);
      },
      onFinish: (result: any) => {
        setIsLoading(false);
        console.log('Transact Finished:', result);
        Alert.alert('Success', 'Transact flow completed successfully!');
      },
      onClose: () => {
        setIsLoading(false);
        console.log('Transact Closed');
        Alert.alert('Info', 'Transact flow was closed by user');
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Public Token *</Text>
          <TextInput
            style={styles.input}
            value={publicToken}
            onChangeText={setPublicToken}
            placeholder="Enter your Atomic public token"
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

        <View style={styles.switchGroup}>
          <Text style={styles.label}>Theme</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.switchGroup}>
          <Text style={styles.label}>Debug Mode</Text>
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
        <Text style={styles.sectionTitle}>Product</Text>
        <View style={styles.optionGrid}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.key}
              style={[
                styles.optionButton,
                selectedProduct === product.key && styles.selectedOption,
              ]}
              onPress={() => setSelectedProduct(product.key)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedProduct === product.key && styles.selectedOptionText,
                ]}
              >
                {product.label}
              </Text>
            </TouchableOpacity>
          ))}
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Deeplink Options (Optional)</Text>

        <View style={styles.switchGroup}>
          <Text style={styles.label}>Use Deeplink</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Off</Text>
            <Switch
              value={useDeeplink}
              onValueChange={setUseDeeplink}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor="#fff"
            />
            <Text style={styles.switchLabel}>On</Text>
          </View>
        </View>

        {useDeeplink && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Step</Text>
              <View style={styles.optionGrid}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    deeplinkStep === Step.LOGIN_COMPANY &&
                      styles.selectedOption,
                  ]}
                  onPress={() => setDeeplinkStep(Step.LOGIN_COMPANY)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      deeplinkStep === Step.LOGIN_COMPANY &&
                        styles.selectedOptionText,
                    ]}
                  >
                    Login Company
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    deeplinkStep === Step.SEARCH_COMPANY &&
                      styles.selectedOption,
                  ]}
                  onPress={() => setDeeplinkStep(Step.SEARCH_COMPANY)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      deeplinkStep === Step.SEARCH_COMPANY &&
                        styles.selectedOptionText,
                    ]}
                  >
                    Search Company
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Company ID</Text>
              <TextInput
                style={styles.input}
                value={deeplinkCompanyId}
                onChangeText={setDeeplinkCompanyId}
                placeholder="Enter company ID for deeplink"
                placeholderTextColor="#9ca3af"
              />
            </View>

            {selectedProduct === Product.SWITCH && (
              <View style={styles.switchGroup}>
                <Text style={styles.label}>Single Switch</Text>
                <View style={styles.switchContainer}>
                  <Text style={styles.switchLabel}>Off</Text>
                  <Switch
                    value={singleSwitch}
                    onValueChange={setSingleSwitch}
                    trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                    thumbColor="#fff"
                  />
                  <Text style={styles.switchLabel}>On</Text>
                </View>
              </View>
            )}
          </>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.launchButton, isLoading && styles.disabledButton]}
          onPress={launchTransact}
          disabled={isLoading}
        >
          <Text style={styles.launchButtonText}>
            {isLoading ? 'Launching...' : 'Launch Transact'}
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
  helperText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
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
    backgroundColor: '#6366f1',
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
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  optionText: {
    fontSize: 14,
    color: '#6b7280',
  },
  selectedOptionText: {
    color: '#ffffff',
  },
  buttonContainer: {
    padding: 16,
  },
  launchButton: {
    backgroundColor: '#10b981',
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

export default TransactScreen;
