import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface CardProps {
  title?: string;
  footer?: string;
  children: React.ReactNode;
}

// Grouped-list style section container used across the screens.
export const Card: React.FC<CardProps> = ({ title, footer, children }) => (
  <View style={styles.wrapper}>
    {title ? <Text style={styles.title}>{title}</Text> : null}
    <View style={styles.card}>{children}</View>
    {footer ? <Text style={styles.footer}>{footer}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  footer: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginLeft: spacing.xs,
  },
});
