import type {
  NavigatorScreenParams,
  CompositeScreenProps,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type CompanyScope = 'paylink' | 'userlink';

export type TabParamList = {
  PayLink: undefined;
  UserLink: undefined;
  Actions: undefined;
  Events: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  CompanyLogin: { scope: CompanyScope };
  ActionsJsonEditor: undefined;
  DataRequestProvider: undefined;
};

// Props for a screen that lives in the bottom tabs but also needs to reach the
// root stack (to push CompanyLogin / ActionsJsonEditor or switch tabs).
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

export type RootScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
