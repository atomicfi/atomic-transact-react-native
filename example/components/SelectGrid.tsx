import { StyleSheet, Text, View } from 'react-native';
import { CapsuleButton } from './CapsuleButton';
import { colors, spacing } from '../theme';

export interface Option<T extends string> {
  value: T;
  label: string;
}

interface SingleSelectGridProps<T extends string> {
  title?: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function SingleSelectGrid<T extends string>({
  title,
  options,
  value,
  onChange,
}: SingleSelectGridProps<T>) {
  return (
    <View>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.grid}>
        {options.map((option) => (
          <CapsuleButton
            key={option.value}
            label={option.label}
            selected={value === option.value}
            onPress={() => onChange(option.value)}
          />
        ))}
      </View>
    </View>
  );
}

interface MultiSelectGridProps<T extends string> {
  title?: string;
  options: Option<T>[];
  values: T[];
  onToggle: (value: T) => void;
}

export function MultiSelectGrid<T extends string>({
  title,
  options,
  values,
  onToggle,
}: MultiSelectGridProps<T>) {
  return (
    <View>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.grid}>
        {options.map((option) => (
          <CapsuleButton
            key={option.value}
            label={option.label}
            selected={values.includes(option.value)}
            onPress={() => onToggle(option.value)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
