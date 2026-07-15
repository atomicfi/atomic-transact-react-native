import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSettings } from '../state/SettingsContext';
import { useNow } from '../hooks/useNow';
import { colors, radius, spacing } from '../theme';

const DAY_MS = 24 * 60 * 60 * 1000;

// Warns when the public token is missing or likely expired (>24h old) and
// offers a shortcut to Settings. Renders nothing when the token looks healthy.
export const CheckPublicTokenBanner: React.FC<{
  onGoToSettings: () => void;
}> = ({ onGoToSettings }) => {
  const { settings } = useSettings();
  const now = useNow(settings.publicTokenLastChange);
  const isEmpty = settings.publicToken.trim() === '';
  const isStale =
    !isEmpty &&
    settings.publicTokenLastChange != null &&
    now - settings.publicTokenLastChange > DAY_MS;

  if (!isEmpty && !isStale) return null;

  return (
    <View style={[styles.banner, isStale ? styles.warning : styles.error]}>
      <Text style={styles.message}>
        {isEmpty
          ? "Don't forget to set your public token in Settings."
          : 'Public token was last changed more than 24 hours ago and has likely expired.'}
      </Text>
      <TouchableOpacity onPress={onGoToSettings} activeOpacity={0.7}>
        <Text style={styles.link}>Add it now →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  error: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  warning: {
    backgroundColor: '#fffbeb',
    borderColor: '#fde68a',
  },
  message: {
    fontSize: 13,
    color: colors.text,
    textAlign: 'center',
  },
  link: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
    marginTop: spacing.sm,
  },
});
