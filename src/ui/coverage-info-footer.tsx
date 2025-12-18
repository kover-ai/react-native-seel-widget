import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import KeyValue from '../constants/key_value';

interface CoverageInfoFooterProps {
  termsUrl: string;
  privacyPolicyUrl: string;
  dictionary: any;
  onChangeOptedInValue: (value: boolean) => void;
}

export default function CoverageInfoFooter({
  termsUrl = '',
  privacyPolicyUrl = '',
  dictionary = {},
  onChangeOptedInValue = (_: boolean) => {},
}: CoverageInfoFooterProps) {
  const colorScheme = useColorScheme();
  const isDark = false && colorScheme === 'dark';

  const _poweredByText = [
    defaultStyles.poweredByText,
    isDark ? defaultStyles.dartPoweredByText : defaultStyles.lightPoweredByText,
  ];
  return (
    <View style={[defaultStyles.container]}>
      <TouchableOpacity
        style={defaultStyles.optedInButton}
        onPress={() => {
          onChangeOptedInValue(true);
        }}
      >
        <Text style={defaultStyles.optedInButtonTitle}>
          {dictionary[KeyValue.cta_secure_purchase] ??
            'Secure Your Purchase Now'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={defaultStyles.noNeedButton}
        hitSlop={{ top: 8, bottom: 8 }}
        onPress={() => {
          onChangeOptedInValue(false);
        }}
      >
        <Text style={defaultStyles.noNeedButtonTitle}>
          {dictionary[KeyValue.cta_continue_without] ??
            'Continue Without Protection'}
        </Text>
      </TouchableOpacity>
      <View style={defaultStyles.horizontalStackView}>
        <TouchableOpacity
          style={defaultStyles.privacyPolicyButton}
          hitSlop={{ top: 14 }}
          onPress={() => {
            Linking.openURL(privacyPolicyUrl);
          }}
        >
          <Text style={defaultStyles.privacyPolicyButtonTitle}>
            {dictionary[KeyValue.privacy_policy] ?? 'Privacy Policy'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={defaultStyles.termsButton}
          hitSlop={{ top: 14 }}
          onPress={() => {
            Linking.openURL(termsUrl);
          }}
        >
          <Text style={defaultStyles.termsButtonTitle}>
            {dictionary[KeyValue.terms_of_service] ?? 'Terms of Service'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={defaultStyles.poweredByContainer}>
        <Text style={_poweredByText}>
          {dictionary[KeyValue.powered_by] ?? 'Powered by'}
        </Text>
        <Image
          style={defaultStyles.seelWordIcon}
          source={require('../assets/images/seel_word.png')}
        />
      </View>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    paddingTop: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optedInButton: {
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  optedInButtonTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: Platform.select({
      ios: 'Inter',
    }),
    textAlign: 'center',
    fontWeight: 600,
  },
  noNeedButton: {
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNeedButtonTitle: {
    color: '#808692',
    fontSize: 14,
    fontFamily: Platform.select({
      ios: 'Inter',
    }),
    textAlign: 'center',
    fontWeight: 600,
  },
  horizontalStackView: {
    width: '100%',
    marginTop: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  privacyPolicyButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  privacyPolicyButtonTitle: {
    color: '#5C5F62',
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 16,
    textDecorationLine: 'underline',
  },
  termsButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsButtonTitle: {
    color: '#5C5F62',
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 16,
    textDecorationLine: 'underline',
  },
  poweredByContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  poweredByText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 400,
    lineHeight: 16,
  },
  lightPoweredByText: {
    color: '#565656',
  },
  dartPoweredByText: {
    color: 'white',
  },
  seelWordIcon: {
    width: 32,
    height: 16,
  },
});
