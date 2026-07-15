import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import PayLinkScreen from '../screens/PayLinkScreen';
import UserLinkScreen from '../screens/UserLinkScreen';
import ActionsScreen from '../screens/ActionsScreen';
import EventsScreen from '../screens/EventsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useEventLog } from '../state/EventLogContext';
import type { TabParamList } from './types';
import { colors, spacing } from '../theme';

const Tab = createBottomTabNavigator<TabParamList>();

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const ICONS: Record<keyof TabParamList, [IoniconName, IoniconName]> = {
  PayLink: ['card-outline', 'card'],
  UserLink: ['shield-checkmark-outline', 'shield-checkmark'],
  Actions: ['list-outline', 'list'],
  Events: ['layers-outline', 'layers'],
  Settings: ['settings-outline', 'settings'],
};

export const Tabs: React.FC = () => {
  const { unreadCount } = useEventLog();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.accent,
        headerRightContainerStyle: { paddingRight: spacing.md },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarIcon: ({ focused, color, size }) => {
          const [outline, filled] = ICONS[route.name];
          return (
            <Ionicons
              name={focused ? filled : outline}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="PayLink"
        component={PayLinkScreen}
        options={{ title: 'Pay Link' }}
      />
      <Tab.Screen
        name="UserLink"
        component={UserLinkScreen}
        options={{ title: 'User Link' }}
      />
      <Tab.Screen
        name="Actions"
        component={ActionsScreen}
        options={{ title: 'Actions' }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          title: 'Events',
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
};
