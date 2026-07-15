import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface CapsuleButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const CapsuleButton: React.FC<CapsuleButtonProps> = ({
  label,
  selected,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.capsule, selected && styles.selected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[styles.label, selected && styles.selectedLabel]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  capsule: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  selected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentMuted,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  selectedLabel: {
    color: colors.accent,
    fontWeight: '600',
  },
});
