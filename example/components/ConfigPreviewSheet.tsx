import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../theme';

interface ConfigPreviewSheetProps {
  visible: boolean;
  onClose: () => void;
  config: unknown;
}

// Shows the JSON config we're about to send to Atomic.transact. Accurate because
// the config is built in JS before being handed to the native bridge.
export const ConfigPreviewSheet: React.FC<ConfigPreviewSheetProps> = ({
  visible,
  onClose,
  config,
}) => (
  <Modal
    visible={visible}
    animationType="slide"
    presentationStyle="pageSheet"
    onRequestClose={onClose}
  >
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Text style={styles.title}>Config Preview</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>Done</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
        >
          <Text style={styles.code}>{JSON.stringify(config, null, 2)}</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  close: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: '600',
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: spacing.lg,
  },
  code: {
    fontFamily: 'Courier',
    fontSize: 13,
    color: colors.text,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.sm,
  },
});
