import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import {
  Atomic,
  Environment,
  PresentationStyles,
  Scope,
} from '@atomicfi/transact-react-native';
import type { PresentationStyleIOS } from '@atomicfi/transact-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Action'>;

type EnvironmentOption = 'sandbox' | 'production' | 'custom';

type FetchedAction = { type: string; actionId: string };
type FetchedAccount = { company?: string; actions: FetchedAction[] };

type RawAction = { type: string; actionId: string };
type RawBillOrExpense = { actions?: RawAction[] };
type RawAccount = {
  company?: { name?: string };
  actions?: RawAction[];
  bills?: RawBillOrExpense[];
  expenses?: RawBillOrExpense[];
};

const ACTIONS_STORAGE_KEY = 'atomic_paylink_actions';
const ACTIONS_LAST_CHANGED_KEY = 'atomic_paylink_actions_last_changed';
const STALE_THRESHOLD_MS = 60 * 60 * 1000;

const buildDefaultSelections = (
  accounts: FetchedAccount[]
): Record<number, string> => {
  const next: Record<number, string> = {};
  accounts.forEach((account, index) => {
    if (account.actions[0]) {
      next[index] = account.actions[0].actionId;
    }
  });
  return next;
};

const ActionScreen: React.FC<Props> = () => {
  const [publicToken, setPublicToken] = useState('');
  const [actionId, setActionId] = useState('');
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<EnvironmentOption>('sandbox');
  const [customTransactPath, setCustomTransactPath] = useState('');
  const [customApiPath, setCustomApiPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [presentationStyleIOS, setPresentationStyleIOS] =
    useState<PresentationStyleIOS>(PresentationStyles.formSheet);
  const [debugEnabled, setDebugEnabled] = useState(false);
  const [headless, setHeadless] = useState(false);
  const [fetchedAccounts, setFetchedAccounts] = useState<FetchedAccount[]>([]);
  const [selectedActionByAccount, setSelectedActionByAccount] = useState<
    Record<number, string>
  >({});
  const [lastChanged, setLastChanged] = useState<Date | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [storedActions, storedTimestamp] = await Promise.all([
          AsyncStorage.getItem(ACTIONS_STORAGE_KEY),
          AsyncStorage.getItem(ACTIONS_LAST_CHANGED_KEY),
        ]);
        if (storedActions) {
          const parsed = JSON.parse(storedActions);
          if (
            Array.isArray(parsed) &&
            parsed.every(
              (a) => a && Array.isArray((a as FetchedAccount).actions)
            )
          ) {
            const accounts = parsed as FetchedAccount[];
            setFetchedAccounts(accounts);
            setSelectedActionByAccount(buildDefaultSelections(accounts));
          } else {
            await AsyncStorage.removeItem(ACTIONS_STORAGE_KEY);
            await AsyncStorage.removeItem(ACTIONS_LAST_CHANGED_KEY);
          }
        }
        if (storedTimestamp) {
          const ms = Number(storedTimestamp);
          if (Number.isFinite(ms)) {
            setLastChanged(new Date(ms));
          }
        }
      } catch (err) {
        console.warn('Failed to hydrate stored actions', err);
      }
    })();
  }, []);

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

  const getApiBase = () => {
    switch (selectedEnvironment) {
      case 'sandbox':
        return 'https://sandbox-api.atomicfi.com';
      case 'production':
        return 'https://api.atomicfi.com';
      case 'custom':
        return customApiPath.trim();
      default:
        return 'https://sandbox-api.atomicfi.com';
    }
  };

  const validateCustomEnv = () => {
    if (
      selectedEnvironment === 'custom' &&
      (!customTransactPath.trim() || !customApiPath.trim())
    ) {
      Alert.alert(
        'Error',
        'Please enter both transact path and API path for custom environment'
      );
      return false;
    }
    return true;
  };

  const fetchActions = async () => {
    if (!publicToken.trim()) {
      Alert.alert('Error', 'Please enter a valid public token');
      return;
    }
    if (!validateCustomEnv()) return;

    setIsFetching(true);
    try {
      const res = await fetch(`${getApiBase()}/pay-link/accounts`, {
        headers: {
          'x-public-token': publicToken.trim(),
          'x-api-version': 'v2',
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const body = (await res.json()) as { accounts?: RawAccount[] };
      const accounts: FetchedAccount[] = [];
      for (const account of body.accounts ?? []) {
        const actions: FetchedAction[] = [];
        const seen = new Set<string>();
        const sources: (RawAction[] | undefined)[] = [
          account.actions,
          ...(account.bills ?? []).map((b) => b.actions),
          ...(account.expenses ?? []).map((e) => e.actions),
        ];
        for (const list of sources) {
          for (const action of list ?? []) {
            if (!action?.actionId || seen.has(action.actionId)) continue;
            seen.add(action.actionId);
            actions.push({ type: action.type, actionId: action.actionId });
          }
        }
        if (actions.length > 0) {
          accounts.push({ company: account.company?.name, actions });
        }
      }
      const now = new Date();
      setFetchedAccounts(accounts);
      setSelectedActionByAccount(buildDefaultSelections(accounts));
      setLastChanged(now);
      await AsyncStorage.setItem(ACTIONS_STORAGE_KEY, JSON.stringify(accounts));
      await AsyncStorage.setItem(
        ACTIONS_LAST_CHANGED_KEY,
        String(now.getTime())
      );
    } catch (err) {
      Alert.alert(
        'Fetch failed',
        err instanceof Error ? err.message : 'Unknown error'
      );
    } finally {
      setIsFetching(false);
    }
  };

  const launchAction = (idOverride?: string) => {
    if (!publicToken.trim()) {
      Alert.alert('Error', 'Please enter a valid public token');
      return;
    }

    const targetActionId = (idOverride ?? actionId).trim();
    if (!targetActionId) {
      Alert.alert('Error', 'Please enter a valid action ID');
      return;
    }

    if (!validateCustomEnv()) return;

    setIsLoading(true);

    Atomic.transact({
      config: {
        publicToken: publicToken.trim(),
        scope: Scope.PAYLINK,
        tasks: [
          {
            operation: 'action',
            action: { id: targetActionId },
            headless,
          },
        ],
      },
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

  const isStale =
    lastChanged !== null &&
    Date.now() - lastChanged.getTime() > STALE_THRESHOLD_MS;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Action</Text>
        <Text style={styles.headerSubtitle}>
          Launch a specific Atomic action through transact()
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Public Token *</Text>
          <TextInput
            style={styles.input}
            value={publicToken}
            onChangeText={setPublicToken}
            placeholder="Enter your public token"
            placeholderTextColor="#9ca3af"
            autoCapitalize="none"
            autoCorrect={false}
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

        <View style={styles.inputGroup}>
          <View style={styles.switchRow}>
            <Text style={styles.label}>Debug Mode</Text>
            <Switch
              value={debugEnabled}
              onValueChange={setDebugEnabled}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.switchRow}>
            <Text style={styles.label}>Headless</Text>
            <Switch
              value={headless}
              onValueChange={setHeadless}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fetched Actions</Text>

        <View style={styles.inputGroup}>
          <TouchableOpacity
            style={[
              styles.fetchButton,
              (isFetching || !publicToken.trim()) && styles.disabledButton,
            ]}
            onPress={fetchActions}
            disabled={isFetching || !publicToken.trim()}
          >
            <Text style={styles.fetchButtonText}>
              {isFetching ? 'Fetching...' : 'Fetch Latest Actions'}
            </Text>
          </TouchableOpacity>
          {isStale && lastChanged && (
            <Text style={styles.staleText}>
              {`Last Changed: ${lastChanged.toLocaleString()}. The default expiration is 1 hour, make sure these actions are up to date.`}
            </Text>
          )}
        </View>

        {fetchedAccounts.map((account, index) => {
          const selected = selectedActionByAccount[index] ?? '';
          return (
            <View
              key={`${account.company ?? 'account'}-${index}`}
              style={styles.accountGroup}
            >
              <Text style={styles.label}>
                {account.company ?? `Account ${index + 1}`}
              </Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selected}
                  onValueChange={(value) =>
                    setSelectedActionByAccount((prev) => ({
                      ...prev,
                      [index]: String(value),
                    }))
                  }
                >
                  {account.actions.map((action) => (
                    <Picker.Item
                      key={action.actionId}
                      value={action.actionId}
                      label={action.type}
                    />
                  ))}
                </Picker>
              </View>
              <TouchableOpacity
                style={[
                  styles.launchButton,
                  styles.accountLaunchButton,
                  (isLoading || !selected) && styles.disabledButton,
                ]}
                onPress={() => launchAction(selected)}
                disabled={isLoading || !selected}
              >
                <Text style={styles.launchButtonText}>
                  {isLoading ? 'Launching...' : 'Launch Action'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manual Action</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Action ID</Text>
          <TextInput
            style={styles.input}
            value={actionId}
            onChangeText={setActionId}
            placeholder="Enter action ID (e.g., action-123)"
            placeholderTextColor="#9ca3af"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.launchButton,
            (isLoading || !actionId.trim()) && styles.disabledButton,
          ]}
          onPress={() => launchAction()}
          disabled={isLoading || !actionId.trim()}
        >
          <Text style={styles.launchButtonText}>
            {isLoading ? 'Launching...' : 'Launch Action'}
          </Text>
        </TouchableOpacity>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    paddingBottom: 48,
  },
  accountGroup: {
    marginTop: 16,
  },
  accountLaunchButton: {
    marginTop: 12,
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
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
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
  fetchButton: {
    borderWidth: 1,
    borderColor: '#3b82f6',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  fetchButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
  },
  staleText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
  },
  actionList: {
    gap: 8,
  },
  actionButton: {
    backgroundColor: '#10b981',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
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

export default ActionScreen;
