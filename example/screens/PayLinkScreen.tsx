import React, { useLayoutEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  App,
  DeferredPaymentMethodStrategy,
  Product,
  Scope,
  Step,
} from '@atomicfi/transact-react-native';
import { Card } from '../components/Card';
import { ToggleRow } from '../components/ToggleRow';
import { RadioRow } from '../components/RadioRow';
import { FullWidthButton } from '../components/FullWidthButton';
import { MultiSelectGrid, SingleSelectGrid } from '../components/SelectGrid';
import { CheckPublicTokenBanner } from '../components/CheckPublicTokenBanner';
import { ConfigPreviewSheet } from '../components/ConfigPreviewSheet';
import { useSettings } from '../state/SettingsContext';
import { usePayLink } from '../state/PayLinkContext';
import { useDataRequest } from '../state/DataRequestContext';
import type {
  PayLinkStartingScreen,
  PayLinkTask,
} from '../state/PayLinkContext';
import { useTransact } from '../config/buildConfig';
import type { LaunchConfig } from '../config/buildConfig';
import type { TabScreenProps } from '../navigation/types';
import { colors, spacing } from '../theme';

const STARTING_SCREENS: { value: PayLinkStartingScreen; label: string }[] = [
  { value: 'welcome', label: 'Welcome' },
  { value: 'search', label: 'Search' },
  { value: 'companyLogin', label: 'Company Login' },
];

const TASK_PRODUCT: Record<PayLinkTask, string> = {
  switch: Product.SWITCH,
  present: Product.PRESENT,
  manage: Product.MANAGE,
};

const APPS: { value: string; label: string }[] = [
  { value: App.PAY_NOW, label: 'Pay Now' },
  { value: App.EXPENSES, label: 'Expenses' },
  { value: App.ORDERS, label: 'Orders' },
  { value: App.SUGGESTIONS, label: 'Suggestions' },
];

const PayLinkScreen: React.FC<TabScreenProps<'PayLink'>> = ({ navigation }) => {
  const { settings } = useSettings();
  const { state, update } = usePayLink();
  const { makeResponse } = useDataRequest();
  const { build, launch } = useTransact();
  const [previewVisible, setPreviewVisible] = useState(false);

  const hasToken = settings.publicToken.trim().length > 0;
  const hasPaymentResponse = makeResponse() != null;
  const showApps = state.task === 'manage';
  const showStartingScreen =
    state.task === 'switch' || state.task === 'present';

  const buildLaunchConfig = (): LaunchConfig => {
    const task: any = { operation: TASK_PRODUCT[state.task] };
    if (showApps) task.apps = state.apps;

    let deeplink: Record<string, unknown> | undefined;
    if (showStartingScreen) {
      if (state.startingScreen === 'search') {
        deeplink = { step: Step.SEARCH_COMPANY };
      } else if (
        state.startingScreen === 'companyLogin' &&
        state.companyLoginId
      ) {
        deeplink = {
          step: Step.LOGIN_COMPANY,
          companyId: state.companyLoginId,
        };
      }
    }

    return {
      scope: Scope.PAYLINK,
      tasks: [task],
      deeplink,
      deferredPaymentMethodStrategy: state.useSDKPaymentResponse
        ? DeferredPaymentMethodStrategy.SDK
        : undefined,
    };
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setPreviewVisible(true)}>
          <Ionicons name="code-slash" size={22} color={colors.accent} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const toggleApp = (value: string) =>
    update({
      apps: state.apps.includes(value)
        ? state.apps.filter((a) => a !== value)
        : [...state.apps, value],
    });

  const onInitialize = () => {
    if (!hasToken) {
      Alert.alert('Missing token', 'Set a public token in Settings first.');
      return;
    }
    launch(buildLaunchConfig());
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <CheckPublicTokenBanner
          onGoToSettings={() => navigation.navigate('Settings')}
        />

        <Card title="What task do you want to execute?">
          <RadioRow
            title="Payment Method Switching"
            subtitle="switch"
            selected={state.task === 'switch'}
            onPress={() => update({ task: 'switch' })}
          />
          <RadioRow
            title="Account Linking"
            subtitle="present"
            selected={state.task === 'present'}
            onPress={() => update({ task: 'present' })}
          />
          <RadioRow
            title="Payments Hub"
            subtitle="manage"
            selected={state.task === 'manage'}
            onPress={() => update({ task: 'manage' })}
          />
          {showApps ? (
            <View style={styles.appsGrid}>
              <MultiSelectGrid
                title="Apps to show within the Payments Hub"
                options={APPS}
                values={state.apps}
                onToggle={toggleApp}
              />
            </View>
          ) : null}
        </Card>

        {state.task === 'switch' ? (
          <Card title="Advanced">
            <ToggleRow
              title="Use SDK Payment Response"
              subtitle="Sets deferredPaymentMethodStrategy to sdk"
              value={state.useSDKPaymentResponse}
              onValueChange={(v) => update({ useSDKPaymentResponse: v })}
            />
            {state.useSDKPaymentResponse ? (
              <View style={styles.linkRow}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('DataRequestProvider')}
                  activeOpacity={0.7}
                >
                  <Text style={styles.linkText}>
                    {hasPaymentResponse ? 'Edit' : 'Add'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </Card>
        ) : null}

        {showStartingScreen ? (
          <Card title="Starting Screen">
            <SingleSelectGrid
              options={STARTING_SCREENS}
              value={state.startingScreen}
              onChange={(value) => update({ startingScreen: value })}
            />
            {state.startingScreen === 'companyLogin' ? (
              <TouchableOpacity
                style={styles.companyRow}
                onPress={() =>
                  navigation.navigate('CompanyLogin', { scope: 'paylink' })
                }
                activeOpacity={0.7}
              >
                <Text style={styles.companyLabel}>Company</Text>
                <View style={styles.companyValue}>
                  <Text style={styles.companyName}>
                    {state.companyLoginName || 'Select company'}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.textSecondary}
                  />
                </View>
              </TouchableOpacity>
            ) : null}
          </Card>
        ) : null}

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.footer}>
        <FullWidthButton
          title="Initialize"
          onPress={onInitialize}
          disabled={!hasToken}
        />
      </View>

      <ConfigPreviewSheet
        visible={previewVisible}
        onClose={() => setPreviewVisible(false)}
        config={build(buildLaunchConfig())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  appsGrid: {
    marginTop: spacing.md,
  },
  linkRow: {
    alignItems: 'flex-end',
    marginTop: spacing.sm,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.accent,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  companyLabel: {
    fontSize: 16,
    color: colors.text,
  },
  companyValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  companyName: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  spacer: {
    height: spacing.xl,
  },
});

export default PayLinkScreen;
