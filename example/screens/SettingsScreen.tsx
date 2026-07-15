import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card } from '../components/Card';
import { ToggleRow } from '../components/ToggleRow';
import { SingleSelectGrid } from '../components/SelectGrid';
import { useSettings } from '../state/SettingsContext';
import type {
  DarkModeOption,
  EnvironmentOption,
  LanguageOption,
} from '../state/SettingsContext';
import { colors, radius, spacing } from '../theme';

const ENV_OPTIONS: { value: EnvironmentOption; label: string }[] = [
  { value: 'production', label: 'Production' },
  { value: 'sandbox', label: 'Sandbox' },
  { value: 'custom', label: 'Custom' },
];

const DARK_MODE_OPTIONS: { value: DarkModeOption; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
];

const LANGUAGE_OPTIONS: { value: LanguageOption; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
];

const COLOR_SWATCHES = [
  '#4a5cff',
  '#3b82f6',
  '#10b981',
  '#ef4444',
  '#f59e0b',
  '#8b5cf6',
  '#111827',
  '#ffffff',
];

const ColorField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange }) => (
  <View style={styles.colorField}>
    <Text style={styles.inlineLabel}>{label}</Text>
    <View style={styles.swatchRow}>
      {COLOR_SWATCHES.map((swatch) => (
        <TouchableOpacity
          key={swatch}
          onPress={() => onChange(swatch)}
          style={[
            styles.swatch,
            { backgroundColor: swatch },
            value.toLowerCase() === swatch.toLowerCase() &&
              styles.swatchSelected,
          ]}
        />
      ))}
    </View>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      placeholder="#RRGGBB"
      placeholderTextColor={colors.disabled}
      autoCapitalize="none"
      autoCorrect={false}
    />
  </View>
);

const SettingsScreen: React.FC = () => {
  const { settings, update } = useSettings();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card title="Public Token">
        <TextInput
          style={styles.input}
          value={settings.publicToken}
          onChangeText={(text) => update({ publicToken: text })}
          onEndEditing={(e) =>
            update({
              publicToken: e.nativeEvent.text.trim(),
              publicTokenLastChange: Date.now(),
            })
          }
          placeholder="Paste your public token"
          placeholderTextColor={colors.disabled}
          autoCapitalize="none"
          autoCorrect={false}
          multiline
        />
        <TouchableOpacity
          onPress={() =>
            update({ publicToken: '', publicTokenLastChange: null })
          }
          style={styles.clearButton}
        >
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </Card>

      <Card title="Environment">
        <SingleSelectGrid
          options={ENV_OPTIONS}
          value={settings.environment}
          onChange={(value) => update({ environment: value })}
        />
        {settings.environment === 'custom' ? (
          <View style={styles.customUrls}>
            <TextInput
              style={styles.input}
              value={settings.customTransactPath}
              onChangeText={(text) => update({ customTransactPath: text })}
              placeholder="Transact URL"
              placeholderTextColor={colors.disabled}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={[styles.input, styles.spaced]}
              value={settings.customApiPath}
              onChangeText={(text) => update({ customApiPath: text })}
              placeholder="API URL"
              placeholderTextColor={colors.disabled}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        ) : null}
      </Card>

      <Card title="Theme">
        <ColorField
          label="Brand Color"
          value={settings.brandColor}
          onChange={(value) => update({ brandColor: value })}
        />
        <ColorField
          label="Overlay Color"
          value={settings.overlayColor}
          onChange={(value) => update({ overlayColor: value })}
        />
        <Text style={[styles.inlineLabel, styles.spaced]}>Dark Mode</Text>
        <SingleSelectGrid
          options={DARK_MODE_OPTIONS}
          value={settings.darkMode}
          onChange={(value) => update({ darkMode: value })}
        />
      </Card>

      <Card title="Language">
        <SingleSelectGrid
          options={LANGUAGE_OPTIONS}
          value={settings.language}
          onChange={(value) => update({ language: value })}
        />
      </Card>

      <Card title="Developer">
        <ToggleRow
          title="Debug Mode"
          subtitle="Inspect the webview and stream SDK debug logs"
          value={settings.debug}
          onValueChange={(value) => update({ debug: value })}
        />
        {Platform.OS === 'ios' ? (
          <ToggleRow
            title="Present Fullscreen"
            subtitle="Use fullScreen instead of formSheet (iOS)"
            value={settings.presentFullscreen}
            onValueChange={(value) => update({ presentFullscreen: value })}
          />
        ) : null}
      </Card>

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
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.md,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.card,
  },
  spaced: {
    marginTop: spacing.md,
  },
  clearButton: {
    alignSelf: 'flex-end',
    marginTop: spacing.sm,
  },
  clearText: {
    color: colors.accent,
    fontWeight: '600',
  },
  customUrls: {
    marginTop: spacing.md,
  },
  colorField: {
    marginBottom: spacing.lg,
  },
  inlineLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  swatch: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  swatchSelected: {
    borderWidth: 3,
    borderColor: colors.accent,
  },
  spacer: {
    height: spacing.xl,
  },
});

export default SettingsScreen;
