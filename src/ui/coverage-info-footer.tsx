import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CoverageInfoFooter() {
  return (
    <View style={[defaultStyles.container]}>
      <TouchableOpacity style={defaultStyles.optedInButton}>
        <Text style={defaultStyles.optedInButtonTitle}>
          {'Opt-In Now for Full Protection'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={defaultStyles.noNeedButton}>
        <Text style={defaultStyles.noNeedButtonTitle}>{'No Need'}</Text>
      </TouchableOpacity>
      <View style={defaultStyles.horizontalStackView}>
        <TouchableOpacity style={defaultStyles.privacyPolicyButton}>
          <Text style={defaultStyles.privacyPolicyButtonTitle}>
            {'Privacy Policy'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={defaultStyles.termsButton}>
          <Text style={defaultStyles.termsButtonTitle}>
            {'Terms of Service'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  optedInButton: {
    paddingLeft: 16,
    paddingRight: 16,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  optedInButtonTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  noNeedButton: {
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNeedButtonTitle: {
    color: '#4F4F4F',
    fontSize: 14,
    fontWeight: 'regular',
  },
  horizontalStackView: {
    marginTop: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  privacyPolicyButton: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#5C5F62',
    fontWeight: 'regular',
  },
  privacyPolicyButtonTitle: {
    color: '#5C5F62',
    fontSize: 12,
    fontWeight: '600',
  },
  termsButton: {
    marginLeft: 20,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#5C5F62',
    fontWeight: 'regular',
  },
  termsButtonTitle: {
    color: '#5C5F62',
    fontSize: 12,
    fontWeight: '600',
  },
});
