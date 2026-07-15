import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  payLinkSuggestions,
  userLinkSuggestions,
} from '../constants/companyData';
import type { CompanySuggestion } from '../constants/companyData';
import { usePayLink } from '../state/PayLinkContext';
import { useUserLink } from '../state/UserLinkContext';
import type { RootScreenProps } from '../navigation/types';
import { colors, radius, spacing } from '../theme';

const CompanyLoginScreen: React.FC<RootScreenProps<'CompanyLogin'>> = ({
  navigation,
  route,
}) => {
  const { scope } = route.params;
  const payLink = usePayLink();
  const userLink = useUserLink();

  const suggestions =
    scope === 'paylink' ? payLinkSuggestions : userLinkSuggestions;

  const onSelect = (company: CompanySuggestion) => {
    if (scope === 'paylink') {
      payLink.setCompany(company.id, company.name);
    } else {
      userLink.setCompany(company.id, company.name);
    }
    navigation.goBack();
  };

  const renderItem = ({ item }: { item: CompanySuggestion }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onSelect(item)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.logoWrap,
          { backgroundColor: item.brandColor || colors.cardAlt },
        ]}
      >
        {item.logoUrl ? (
          <Image
            source={{ uri: item.logoUrl }}
            style={styles.logo}
            resizeMode="contain"
          />
        ) : null}
      </View>
      <View style={styles.labels}>
        <Text style={styles.name}>{item.name}</Text>
        {item.fullName ? (
          <Text style={styles.fullName}>{item.fullName}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      data={suggestions}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.card,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  logoWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  logo: {
    width: 36,
    height: 36,
  },
  labels: {
    marginLeft: spacing.md,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  fullName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default CompanyLoginScreen;
