import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import CoverageInfoFooter from './coverage-info-footer';
import KeyValue from '../constants/key_value';

export type Domain = '' | 'US' | 'EU';

interface SeelWFPInfoViewProps {
  domain: Domain;
  widgetTitle: string;
  coverageDetailsText: string[];
  termsUrl: string;
  privacyPolicyUrl: string;
  dictionary: any;
  onClickClose: () => void;
  onChangeOptedInValue: (value: boolean) => void;
}

export default function SeelWFPInfoView({
  domain = '',
  widgetTitle = '',
  coverageDetailsText = [],
  termsUrl = '',
  privacyPolicyUrl = '',
  dictionary = {},
  onClickClose = () => {},
  onChangeOptedInValue = (_: boolean) => {},
}: SeelWFPInfoViewProps) {
  const spacing = 12;
  const margin = 6;
  const marginTop = 15;

  const windowWidth = useWindowDimensions().width;
  const imageWidth = windowWidth;
  const imageHeight = imageWidth;
  return (
    <View style={[defaultStyles.container]}>
      <ImageBackground
        resizeMode="cover"
        source={require('../assets/images/background_image.jpg')}
        style={[
          defaultStyles.imageBackground,
          { width: imageWidth, height: imageHeight },
        ]}
      />
      <View style={defaultStyles.absoluteContainer}>
        <View style={[{ padding: spacing }, defaultStyles.titleContainer]}>
          <View style={defaultStyles.seelLogoContainer}>
            <Image
              source={require('../assets/images/seel_logo.png')}
              style={defaultStyles.seelLogoIcon}
            />
            <TouchableOpacity onPress={onClickClose}>
              <Image
                source={require('../assets/images/close_white.png')}
                style={defaultStyles.closeIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={[defaultStyles.h1]}>
            {dictionary[KeyValue.coverage_title] ?? ''}
          </Text>
          <Text style={[{ marginTop: margin }, defaultStyles.h3]}>
            {dictionary[KeyValue.pricing_message] ?? ''}
          </Text>
        </View>
        <View style={[{ padding: spacing }, defaultStyles.contentContainer]}>
          <Text style={defaultStyles.h2}>{widgetTitle}</Text>
          <View
            style={[defaultStyles.rowContainer, defaultStyles.centerContainer]}
          >
            <Image
              source={require('../assets/images/accredited.png')}
              style={defaultStyles.accreditedIcon}
            />
            <Text
              style={[
                { marginTop: margin },
                defaultStyles.h3,
                defaultStyles.covered,
              ]}
            >
              {dictionary[KeyValue.whats_covered_title] ?? ''}
            </Text>
          </View>
          <ScrollView
            horizontal={false}
            showsVerticalScrollIndicator={true}
            style={[defaultStyles.scrollViewContainer]}
          >
            <View
              style={[
                { marginTop: spacing },
                defaultStyles.scrollViewContentContainer,
              ]}
            >
              {domain === 'US' ? (
                <Text style={defaultStyles.h4}>
                  {dictionary[KeyValue.get_full_refund] ?? ''}
                </Text>
              ) : null}
              {domain === 'EU' /*|| domain === 'IE'*/ ? (
                <Text style={defaultStyles.h4}>
                  {dictionary[KeyValue.standard_coverage_intro] ?? ''}
                </Text>
              ) : null}
              {coverageDetailsText &&
                coverageDetailsText.map((item, _) => {
                  return (
                    <View
                      key={item}
                      style={[{ marginTop: spacing }, defaultStyles.lineView]}
                    >
                      <Image
                        source={require('../assets/images/icon_check_selected_black.png')}
                        style={defaultStyles.checkIcon}
                      />
                      <Text style={[{ marginLeft: spacing }, defaultStyles.p]}>
                        {item || ''}
                      </Text>
                    </View>
                  );
                })}
            </View>
            {domain === 'US' ? (
              <View
                style={[
                  { marginTop: spacing },
                  defaultStyles.scrollViewContentContainer,
                ]}
              >
                <Text style={defaultStyles.h4}>Easy Resolution</Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  {dictionary[KeyValue.resolve_with_clicks] ?? ''}
                </Text>
                <Text style={[{ marginTop: marginTop }, defaultStyles.h4]}>
                  {dictionary[KeyValue.complete_peace_of_mind] ?? ''}
                </Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  {dictionary[KeyValue.zero_risk] && '• '}
                  {dictionary[KeyValue.zero_risk] ?? ''}
                </Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  {dictionary[KeyValue.get_refund_promptly] && '• '}
                  {dictionary[KeyValue.get_refund_promptly] ?? ''}
                </Text>
              </View>
            ) : null}
            {domain === 'EU' /*|| domain === 'IE'*/ ? (
              <View
                style={[
                  { marginTop: spacing },
                  defaultStyles.scrollViewContentContainer,
                ]}
              >
                <Text style={defaultStyles.h4}>
                  {dictionary[KeyValue.additional_coverage_intro] ?? ''}
                </Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  {dictionary[KeyValue.additional_coverage_extended_return] &&
                    '• '}
                  {dictionary[KeyValue.additional_coverage_extended_return] ??
                    ''}
                </Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  {dictionary[KeyValue.additional_coverage_post_delivery] &&
                    '• '}
                  {dictionary[KeyValue.additional_coverage_post_delivery] ?? ''}
                </Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  {dictionary[KeyValue.additional_coverage_delay] && '• '}
                  {dictionary[KeyValue.additional_coverage_delay] ?? ''}
                </Text>

                <Text style={[{ marginTop: marginTop }, defaultStyles.h4]}>
                  {dictionary[KeyValue.concierge_intro] ?? ''}
                </Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  {dictionary[KeyValue.concierge_app_access] && '• '}
                  {dictionary[KeyValue.concierge_app_access] ?? ''}
                </Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  {dictionary[KeyValue.concierge_support] && '• '}
                  {dictionary[KeyValue.concierge_support] ?? ''}
                </Text>
              </View>
            ) : null}
          </ScrollView>
          <CoverageInfoFooter
            termsUrl={termsUrl}
            privacyPolicyUrl={privacyPolicyUrl}
            dictionary={dictionary}
            onChangeOptedInValue={onChangeOptedInValue}
          />
        </View>
      </View>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  columnContainer: {
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageBackground: {
    width: '100%',
    // flex: 1,
    // resizeMode: 'cover',
    aspectRatio: 1,
  },
  absoluteContainer: {
    flexDirection: 'column',
    position: 'absolute',
    top: 30,
    left: 0,
    bottom: 0,
    right: 0,
  },
  titleContainer: {
    flexDirection: 'column',
  },
  seelLogoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seelLogoIcon: {
    width: 80,
    height: 22,
  },
  closeIcon: {
    width: 26,
    height: 26,
  },
  h1: {
    marginTop: 15,
    color: '#ffffff',
    fontSize: 20,
    fontFamily: Platform.select({
      ios: 'Inter',
    }),
    fontStyle: 'normal',
    fontWeight: 800,
  },
  h2: {
    height: 36,
    color: '#000000',
    fontSize: 24,
    fontFamily: Platform.select({
      ios: 'Inter',
    }),
    fontStyle: 'normal',
    fontWeight: 600,
    textAlign: 'center',
  },
  h3: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'Inter',
    }),
    fontStyle: 'normal',
    fontWeight: 500,
  },
  h4: {
    color: '#000000',
    fontSize: 14,
    fontFamily: Platform.select({
      ios: 'Inter',
    }),
    fontStyle: 'normal',
    fontWeight: '600',
  },
  contentContainer: {
    marginTop: 15,
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
  },
  accreditedIcon: {
    width: 32,
    height: 32,
  },
  covered: {
    marginLeft: 4,
    color: '#000000',
    fontWeight: 600,
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollViewContentContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#F8F9FF',
  },
  lineView: {
    flexDirection: 'row',
  },
  checkIcon: {
    width: 20,
    height: 20,
  },
  p: {
    color: '#000000',
    fontSize: 14,
    lineHeight: 20,
    minHeight: 20,
    fontFamily: Platform.select({
      ios: 'Inter',
    }),
    fontStyle: 'normal',
    fontWeight: 400,
  },
});
