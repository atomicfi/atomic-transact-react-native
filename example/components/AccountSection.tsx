import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { AccountGroup, PayLinkAction } from '../constants/actionModels';
import { colors, radius, spacing } from '../theme';

interface AccountSectionProps {
  account: AccountGroup;
  onLaunchAction: (action: PayLinkAction) => void;
}

// Collapsible account accordion mirroring the iOS AccountSectionView: account
// title header, then (when expanded) "Account Actions" + per-bill sub-headers,
// each with one launch button per action.
export const AccountSection: React.FC<AccountSectionProps> = ({
  account,
  onLaunchAction,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded((e) => !e)}
        activeOpacity={0.7}
      >
        <Text style={styles.headerTitle}>{account.title}</Text>
        <Ionicons
          name={expanded ? 'chevron-down' : 'chevron-forward'}
          size={18}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      {expanded ? (
        <View style={styles.body}>
          {account.actions.length > 0 ? (
            <>
              <Text style={styles.subHeader}>Account Actions</Text>
              {account.actions.map((action) => (
                <ActionButton
                  key={action.actionId}
                  action={action}
                  onPress={onLaunchAction}
                />
              ))}
            </>
          ) : null}

          {account.bills.map((bill, index) => (
            <View key={`${bill.title}-${index}`}>
              <Text style={styles.subHeader}>{bill.title} Bill</Text>
              {bill.actions.map((action) => (
                <ActionButton
                  key={action.actionId}
                  action={action}
                  onPress={onLaunchAction}
                />
              ))}
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const ActionButton: React.FC<{
  action: PayLinkAction;
  onPress: (action: PayLinkAction) => void;
}> = ({ action, onPress }) => (
  <TouchableOpacity
    style={styles.actionButton}
    onPress={() => onPress(action)}
    activeOpacity={0.8}
  >
    <Text style={styles.actionText}>{action.type}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    paddingRight: spacing.md,
  },
  body: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  subHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  actionButton: {
    paddingVertical: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.separator,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
    textAlign: 'center',
  },
});
