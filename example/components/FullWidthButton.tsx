import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { colors, radius, spacing } from '../theme';

interface FullWidthButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export const FullWidthButton: React.FC<FullWidthButtonProps> = ({
  title,
  onPress,
  disabled,
  loading,
  variant = 'primary',
}) => {
  const isSecondary = variant === 'secondary';
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSecondary && styles.secondary,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isSecondary ? colors.accent : '#ffffff'} />
      ) : (
        <Text style={[styles.text, isSecondary && styles.secondaryText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md + 2,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: colors.accentMuted,
  },
  disabled: {
    backgroundColor: colors.disabled,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  secondaryText: {
    color: colors.accent,
  },
});
