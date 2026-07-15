import React, { useLayoutEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product, Scope, Step } from '@atomicfi/transact-react-native';
import { Card } from '../components/Card';
import { RadioRow } from '../components/RadioRow';
import { FullWidthButton } from '../components/FullWidthButton';
import { SingleSelectGrid } from '../components/SelectGrid';
import { CheckPublicTokenBanner } from '../components/CheckPublicTokenBanner';
import { ConfigPreviewSheet } from '../components/ConfigPreviewSheet';
import { useSettings } from '../state/SettingsContext';
import { useUserLink } from '../state/UserLinkContext';
import type {
  UserLinkStartingScreen,
  UserLinkTask,
} from '../state/UserLinkContext';
import { useTransact } from '../config/buildConfig';
import type { LaunchConfig } from '../config/buildConfig';
import type { TabScreenProps } from '../navigation/types';
import { colors, radius, spacing } from '../theme';

const STARTING_SCREENS: { value: UserLinkStartingScreen; label: string }[] = [
  { value: 'welcome', label: 'Welcome' },
  { value: 'search', label: 'Search' },
  { value: 'companyLogin', label: 'Company Login' },
];

const TASK_PRODUCT: Record<UserLinkTask, string> = {
  deposit: Product.DEPOSIT,
  verify: Product.VERIFY,
};

const UserLinkScreen: React.FC<TabScreenProps<'UserLink'>> = ({
  navigation,
}) => {
  const { settings } = useSettings();
  const { state, update } = useUserLink();
  const { build, launch } = useTransact();
  const [previewVisible, setPreviewVisible] = useState(false);

  const hasToken = settings.publicToken.trim().length > 0;

  const buildLaunchConfig = (): LaunchConfig => {
    const tasks: any[] = [{ operation: TASK_PRODUCT[state.task] }];

    let deeplink: Record<string, unknown> | undefined;
    if (state.startingScreen === 'search') {
      deeplink = { step: Step.SEARCH_COMPANY };
    } else if (
      state.startingScreen === 'companyLogin' &&
      state.companyLoginId
    ) {
      deeplink = { step: Step.LOGIN_COMPANY, companyId: state.companyLoginId };
    }

    const ruleId = state.searchRuleId.trim();

    return {
      scope: Scope.USERLINK,
      tasks,
      deeplink,
      search: ruleId ? { ruleId } : undefined,
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
            title="Direct Deposit Switching"
            subtitle="deposit"
            selected={state.task === 'deposit'}
            onPress={() => update({ task: 'deposit' })}
          />
          <RadioRow
            title="Payroll Data"
            subtitle="verify"
            selected={state.task === 'verify'}
            onPress={() => update({ task: 'verify' })}
          />
        </Card>

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
                navigation.navigate('CompanyLogin', { scope: 'userlink' })
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

        <Card title="Search Rule ID">
          <TextInput
            style={styles.input}
            value={state.searchRuleId}
            onChangeText={(text) => update({ searchRuleId: text })}
            placeholder="Optional search rule ID"
            placeholderTextColor={colors.disabled}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Card>

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
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.md,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.card,
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

export default UserLinkScreen;
