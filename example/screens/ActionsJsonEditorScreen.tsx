import React, { useCallback, useLayoutEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { FullWidthButton } from '../components/FullWidthButton';
import { useActions } from '../state/ActionsContext';
import type { RootScreenProps } from '../navigation/types';
import { colors, spacing } from '../theme';

const ActionsJsonEditorScreen: React.FC<
  RootScreenProps<'ActionsJsonEditor'>
> = ({ navigation }) => {
  const { editorText, setEditorText, saveEditor, syncEditorFromStored } =
    useActions();

  const onCancel = useCallback(() => {
    syncEditorFromStored();
    navigation.goBack();
  }, [navigation, syncEditorFromStored]);

  const onSave = useCallback(() => {
    if (saveEditor()) {
      navigation.goBack();
    } else {
      Alert.alert(
        'Invalid JSON',
        'Paste a pay-link/accounts response, a grouped array, or a flat [{ type, actionId }] array.'
      );
    }
  }, [navigation, saveEditor]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.headerButton}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={onSave}>
          <Text style={[styles.headerButton, styles.headerButtonBold]}>
            Save
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, onCancel, onSave]);

  const onPaste = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) setEditorText(text);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TextInput
        style={styles.editor}
        value={editorText}
        onChangeText={setEditorText}
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Paste actions JSON here"
        placeholderTextColor={colors.disabled}
        textAlignVertical="top"
      />
      <View style={styles.footer}>
        <FullWidthButton title="Paste From Clipboard" onPress={onPaste} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  editor: {
    flex: 1,
    margin: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 13,
    color: colors.text,
  },
  footer: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  headerButton: {
    fontSize: 16,
    color: colors.accent,
  },
  headerButtonBold: {
    fontWeight: '700',
  },
});

export default ActionsJsonEditorScreen;
