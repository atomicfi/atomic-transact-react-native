import React, { useLayoutEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDataRequest } from '../state/DataRequestContext';
import type { RootScreenProps } from '../navigation/types';
import { colors, radius, spacing } from '../theme';

type KeyboardType = 'default' | 'number-pad' | 'email-address' | 'phone-pad';
type AutoCap = 'none' | 'words' | 'characters';

interface DataFieldProps {
  label: string;
  value: string;
  displayValue?: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardType;
  autoCapitalize?: AutoCap;
  maxLength?: number;
  placeholder?: string;
  flex?: number;
}

const DataField: React.FC<DataFieldProps> = ({
  label,
  value,
  displayValue,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'words',
  maxLength,
  placeholder,
  flex,
}) => (
  <View style={[styles.field, flex != null ? { flex } : undefined]}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrap}>
      <TextInput
        style={styles.inputInner}
        value={displayValue ?? value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={colors.disabled}
        maxLength={maxLength}
      />
      {value.length > 0 ? (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          hitSlop={8}
          style={styles.clearIcon}
        >
          <Ionicons name="close" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      ) : null}
    </View>
  </View>
);

const SectionCard: React.FC<{
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  filled: number;
  total: number;
  children: React.ReactNode;
}> = ({ icon, title, filled, total, children }) => (
  <View style={styles.sectionCard}>
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={20} color={colors.accent} />
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.flexSpacer} />
      <Text
        style={[styles.filledCount, filled > 0 && styles.filledCountActive]}
      >
        {filled}/{total} filled
      </Text>
    </View>
    {children}
  </View>
);

const CARD_TYPES: { value: 'credit' | 'debit'; label: string }[] = [
  { value: 'credit', label: 'Credit' },
  { value: 'debit', label: 'Debit' },
];

const CardTypeDropdown: React.FC<{
  value: 'credit' | 'debit';
  onSelect: (value: 'credit' | 'debit') => void;
}> = ({ value, onSelect }) => {
  const [open, setOpen] = useState(false);
  const selectedLabel =
    CARD_TYPES.find((o) => o.value === value)?.label ?? 'Credit';
  return (
    <View style={styles.field}>
      <Text style={styles.label}>Type</Text>
      <TouchableOpacity
        style={styles.inputWrap}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.inputInner}>{selectedLabel}</Text>
        <Ionicons name="chevron-down" size={18} color={colors.textSecondary} />
      </TouchableOpacity>
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.menu}>
            {CARD_TYPES.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.menuItem}
                onPress={() => {
                  onSelect(option.value);
                  setOpen(false);
                }}
              >
                <Text style={styles.menuItemText}>{option.label}</Text>
                {option.value === value ? (
                  <Ionicons name="checkmark" size={18} color={colors.accent} />
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

function formatExpiry(raw: string): string {
  return raw.length > 2 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw;
}

const DataRequestProviderScreen: React.FC<
  RootScreenProps<'DataRequestProvider'>
> = ({ navigation }) => {
  const { state, update, clearAll } = useDataRequest();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={clearAll}>
          <Ionicons name="trash-outline" size={22} color={colors.danger} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, clearAll]);

  const identityFilled = [
    state.firstName,
    state.lastName,
    state.postalCode,
    state.address,
    state.address2,
    state.city,
    state.state,
    state.phone,
    state.email,
  ].filter((v) => v.trim().length > 0).length;

  const cardFilled = [
    state.cardNumber,
    state.cardExpiry,
    state.cardCvv,
    state.cardType,
  ].filter((v) => v.trim().length > 0).length;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.note}>
          Store identity and payment data for the SDK Data Response. Returned
          from onDataRequest on iOS; on Android the request is logged but the
          wrapper can&apos;t return a response. Use test data only.
        </Text>

        <SectionCard
          icon="person"
          title="Identity"
          filled={identityFilled}
          total={9}
        >
          <View style={styles.row}>
            <DataField
              label="First Name"
              value={state.firstName}
              onChangeText={(t) => update({ firstName: t })}
              flex={1}
            />
            <DataField
              label="Last Name"
              value={state.lastName}
              onChangeText={(t) => update({ lastName: t })}
              flex={1}
            />
          </View>
          <DataField
            label="Address"
            value={state.address}
            onChangeText={(t) => update({ address: t })}
          />
          <DataField
            label="Address 2"
            value={state.address2}
            onChangeText={(t) => update({ address2: t })}
          />
          <DataField
            label="Postal Code"
            value={state.postalCode}
            onChangeText={(t) => update({ postalCode: t })}
            keyboardType="number-pad"
            autoCapitalize="none"
            placeholder="84121"
          />
          <View style={styles.row}>
            <DataField
              label="City"
              value={state.city}
              onChangeText={(t) => update({ city: t })}
              flex={0.65}
            />
            <DataField
              label="State"
              value={state.state}
              onChangeText={(t) => update({ state: t })}
              autoCapitalize="characters"
              maxLength={2}
              placeholder="UT"
              flex={0.35}
            />
          </View>
          <DataField
            label="Phone"
            value={state.phone}
            onChangeText={(t) => update({ phone: t })}
            keyboardType="phone-pad"
            autoCapitalize="none"
          />
          <DataField
            label="Email"
            value={state.email}
            onChangeText={(t) => update({ email: t })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </SectionCard>

        <SectionCard icon="card" title="Card" filled={cardFilled} total={4}>
          <DataField
            label="Card Number"
            value={state.cardNumber}
            onChangeText={(t) => update({ cardNumber: t })}
            keyboardType="number-pad"
            autoCapitalize="none"
            placeholder="4242424242424242"
          />
          <View style={styles.row}>
            <DataField
              label="Expiry"
              value={state.cardExpiry}
              displayValue={formatExpiry(state.cardExpiry)}
              onChangeText={(t) =>
                update({ cardExpiry: t.replace(/\D/g, '').slice(0, 4) })
              }
              keyboardType="number-pad"
              autoCapitalize="none"
              placeholder="MM/YY"
              flex={0.6}
            />
            <DataField
              label="CVV"
              value={state.cardCvv}
              onChangeText={(t) => update({ cardCvv: t })}
              keyboardType="number-pad"
              autoCapitalize="none"
              maxLength={4}
              flex={0.4}
            />
          </View>
          <CardTypeDropdown
            value={state.cardType}
            onSelect={(v) => update({ cardType: v })}
          />
        </SectionCard>

        <View style={styles.spacer} />
      </ScrollView>
    </KeyboardAvoidingView>
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
  note: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  sectionCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginLeft: spacing.sm,
  },
  flexSpacer: {
    flex: 1,
  },
  filledCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  filledCountActive: {
    color: colors.accent,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  field: {
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.card,
  },
  inputInner: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.text,
  },
  clearIcon: {
    paddingLeft: spacing.sm,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  menu: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
  },
  spacer: {
    height: spacing.xl,
  },
});

export default DataRequestProviderScreen;
