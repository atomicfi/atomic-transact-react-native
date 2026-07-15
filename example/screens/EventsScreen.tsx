import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useEventLog } from '../state/EventLogContext';
import type { LoggedEvent } from '../state/EventLogContext';
import { EVENT_META, EVENT_TYPES } from '../constants/eventTypes';
import type { EventType } from '../constants/eventTypes';
import type { TabScreenProps } from '../navigation/types';
import { colors, radius, spacing } from '../theme';

function formatTime(ms: number): string {
  const d = new Date(ms);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

const EventsScreen: React.FC<TabScreenProps<'Events'>> = ({ navigation }) => {
  const { events, clear, markRead } = useEventLog();
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>([
    ...EVENT_TYPES,
  ]);
  const [sortDesc, setSortDesc] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [detail, setDetail] = useState<LoggedEvent | null>(null);

  useFocusEffect(
    useCallback(() => {
      markRead();
    }, [markRead])
  );

  const visibleEvents = useMemo(() => {
    const filtered = events.filter((e) => selectedTypes.includes(e.type));
    const sorted = [...filtered].sort((a, b) =>
      sortDesc ? b.time - a.time : a.time - b.time
    );
    return sorted;
  }, [events, selectedTypes, sortDesc]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => setSortDesc((s) => !s)}>
            <Ionicons name="swap-vertical" size={22} color={colors.accent} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <Ionicons
              name={
                selectedTypes.length === EVENT_TYPES.length
                  ? 'funnel-outline'
                  : 'funnel'
              }
              size={20}
              color={colors.accent}
            />
          </TouchableOpacity>
          {events.length > 0 ? (
            <TouchableOpacity onPress={clear}>
              <Ionicons name="trash-outline" size={22} color={colors.danger} />
            </TouchableOpacity>
          ) : null}
        </View>
      ),
    });
  }, [navigation, events.length, clear, selectedTypes.length]);

  const toggleType = (type: EventType) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const renderItem = ({ item }: { item: LoggedEvent }) => {
    const meta = EVENT_META[item.type];
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => setDetail(item)}
        activeOpacity={0.7}
      >
        <View style={styles.timeCol}>
          <Text style={styles.time}>{formatTime(item.time)}</Text>
          <View style={[styles.dot, { backgroundColor: meta.color }]} />
        </View>
        <View style={[styles.card, { borderColor: `${meta.color}33` }]}>
          <View style={styles.cardHeader}>
            <View
              style={[styles.badge, { backgroundColor: `${meta.color}22` }]}
            >
              <Text style={[styles.badgeText, { color: meta.color }]}>
                {meta.label}
              </Text>
            </View>
            <Text style={styles.title}>{meta.title}</Text>
          </View>
          {item.body ? <Text style={styles.body}>{item.body}</Text> : null}
          {item.secondary ? (
            <Text style={styles.secondary}>{item.secondary}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {visibleEvents.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="layers-outline" size={48} color={colors.disabled} />
          <Text style={styles.emptyTitle}>
            {events.length === 0 ? 'No Events Yet' : 'No Matching Events'}
          </Text>
          <Text style={styles.emptyBody}>
            {events.length === 0
              ? 'Launch Transact to start collecting events.'
              : 'Adjust the filter to show more event types.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={visibleEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

      <Modal
        visible={filterVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setFilterVisible(false)}
      >
        <SafeAreaProvider>
          <SafeAreaView style={styles.sheet} edges={['top', 'bottom']}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Filter Events</Text>
              <TouchableOpacity onPress={() => setFilterVisible(false)}>
                <Text style={styles.headerText}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sheetActions}>
              <TouchableOpacity
                onPress={() => setSelectedTypes([...EVENT_TYPES])}
              >
                <Text style={styles.headerText}>Show All</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedTypes([])}>
                <Text style={styles.headerText}>Hide All</Text>
              </TouchableOpacity>
            </View>
            {EVENT_TYPES.map((type) => {
              const meta = EVENT_META[type];
              const active = selectedTypes.includes(type);
              return (
                <TouchableOpacity
                  key={type}
                  style={styles.filterRow}
                  onPress={() => toggleType(type)}
                >
                  <View style={styles.filterLabel}>
                    <View
                      style={[styles.dot, { backgroundColor: meta.color }]}
                    />
                    <Text style={styles.filterText}>{meta.title}</Text>
                  </View>
                  {active ? (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={colors.accent}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>

      <Modal
        visible={detail != null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setDetail(null)}
      >
        <SafeAreaProvider>
          <SafeAreaView style={styles.sheet} edges={['top', 'bottom']}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>
                {detail ? EVENT_META[detail.type].title : ''}
              </Text>
              <TouchableOpacity onPress={() => setDetail(null)}>
                <Text style={styles.headerText}>Done</Text>
              </TouchableOpacity>
            </View>
            {detail ? (
              <ScrollView contentContainerStyle={styles.detailBody}>
                <Text style={styles.detailMeta}>
                  {new Date(detail.time).toLocaleString()}
                </Text>
                {detail.body ? (
                  <Text style={styles.detailText}>{detail.body}</Text>
                ) : null}
                <Text style={styles.detailLabel}>Raw Callback Data</Text>
                <Text style={styles.code}>
                  {JSON.stringify(detail.raw, null, 2)}
                </Text>
              </ScrollView>
            ) : null}
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  timeCol: {
    width: 68,
    alignItems: 'center',
    paddingTop: spacing.sm,
  },
  time: {
    fontSize: 11,
    fontFamily: 'Courier',
    color: colors.textSecondary,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: spacing.xs,
  },
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Courier',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: 14,
    color: colors.text,
  },
  secondary: {
    fontSize: 12,
    fontFamily: 'Courier',
    color: colors.textSecondary,
    marginTop: 2,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
  },
  emptyBody: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  headerText: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: '600',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  sheetActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  filterLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  filterText: {
    fontSize: 16,
    color: colors.text,
  },
  detailBody: {
    padding: spacing.lg,
  },
  detailMeta: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  detailText: {
    fontSize: 15,
    color: colors.text,
    marginBottom: spacing.md,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
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

export default EventsScreen;
