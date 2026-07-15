import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { ToggleRow } from '../components/ToggleRow';
import { FullWidthButton } from '../components/FullWidthButton';
import { AccountSection } from '../components/AccountSection';
import { CheckPublicTokenBanner } from '../components/CheckPublicTokenBanner';
import { useSettings } from '../state/SettingsContext';
import { useActions } from '../state/ActionsContext';
import { useEventLog } from '../state/EventLogContext';
import { useTransact } from '../config/buildConfig';
import { Scope } from '@atomicfi/transact-react-native';
import type { PayLinkAction } from '../constants/actionModels';
import type { TabScreenProps } from '../navigation/types';
import { useNow } from '../hooks/useNow';
import { colors, spacing } from '../theme';

const STALE_THRESHOLD_MS = 60 * 60 * 1000;

const ActionsScreen: React.FC<TabScreenProps<'Actions'>> = ({ navigation }) => {
  const { settings, apiBase } = useSettings();
  const { groups, lastChanged, fetchActions } = useActions();
  const { logEvent } = useEventLog();
  const { launch } = useTransact();
  const [headless, setHeadless] = useState(false);
  const [fetching, setFetching] = useState(false);
  const now = useNow(lastChanged);

  const hasToken = settings.publicToken.trim().length > 0;

  const isStale = lastChanged != null && now - lastChanged > STALE_THRESHOLD_MS;

  const onFetch = async () => {
    if (!hasToken) {
      Alert.alert('Missing token', 'Set a public token in Settings first.');
      return;
    }
    setFetching(true);
    try {
      await fetchActions(apiBase, settings.publicToken.trim());
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.warn('Failed to fetch actions', err);
      logEvent('error', {
        body: `Fetch actions failed: ${message}`,
        raw: message,
      });
      Alert.alert('Fetch failed', message);
    } finally {
      setFetching(false);
    }
  };

  const launchAction = (action: PayLinkAction) => {
    if (!hasToken) {
      Alert.alert('Missing token', 'Set a public token in Settings first.');
      return;
    }
    launch({
      scope: Scope.PAYLINK,
      tasks: [
        {
          operation: 'action',
          action: { id: action.actionId },
          headless,
        },
      ],
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <CheckPublicTokenBanner
        onGoToSettings={() => navigation.navigate('Settings')}
      />

      <Card
        footer={
          isStale && lastChanged
            ? `Last Changed: ${new Date(lastChanged).toLocaleString()}. The default expiration is 1 hour, make sure these actions are up to date.`
            : undefined
        }
      >
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate('ActionsJsonEditor')}
          activeOpacity={0.7}
        >
          <Text style={styles.rowLabel}>Change Actions</Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
        <View style={styles.divider} />
        <FullWidthButton
          title="Fetch Latest Actions"
          onPress={onFetch}
          loading={fetching}
          disabled={!hasToken}
          variant="secondary"
        />
      </Card>

      <Card>
        <ToggleRow
          title="Headless"
          subtitle="Run actions without showing the UI"
          value={headless}
          onValueChange={setHeadless}
        />
      </Card>

      {groups.length === 0 ? (
        <Text style={styles.empty}>
          No actions yet. Fetch the latest actions or paste your own via Change
          Actions.
        </Text>
      ) : (
        groups.map((account, index) => (
          <AccountSection
            key={`${account.title}-${index}`}
            account={account}
            onLaunchAction={launchAction}
          />
        ))
      )}

      <View style={styles.spacer} />
    </ScrollView>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  rowLabel: {
    fontSize: 16,
    color: colors.text,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.separator,
    marginVertical: spacing.md,
  },
  empty: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  spacer: {
    height: spacing.xl,
  },
});

export default ActionsScreen;
