import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

interface ToggleRowProps {
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const ToggleRow: React.FC<ToggleRowProps> = ({
  title,
  subtitle,
  value,
  onValueChange,
}) => (
  <View style={styles.row}>
    <View style={styles.labels}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: colors.border, true: colors.accent }}
      thumbColor="#ffffff"
    />
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  labels: {
    flex: 1,
    paddingRight: spacing.md,
  },
  title: {
    fontSize: 16,
    color: colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
