import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';

interface RadioRowProps {
  title: string;
  subtitle?: string;
  selected: boolean;
  onPress: () => void;
}

// A single-select (radio) row: title + optional subtitle with a checkmark on the
// selected option. Use for mutually-exclusive choices (only one can be active).
export const RadioRow: React.FC<RadioRowProps> = ({
  title,
  subtitle,
  selected,
  onPress,
}) => (
  <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.labels}>
      <Text style={[styles.title, selected && styles.titleSelected]}>
        {title}
      </Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
    {selected ? (
      <Ionicons name="checkmark" size={22} color={colors.accent} />
    ) : null}
  </TouchableOpacity>
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
  titleSelected: {
    color: colors.accent,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
