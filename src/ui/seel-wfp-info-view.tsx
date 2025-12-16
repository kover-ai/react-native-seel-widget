import { ScrollView } from 'react-native';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

interface SeelWFPInfoViewProps {
  title: string;
  price: string;
  continent: '' | 'US' | 'EU';
  coverageDetailsText: string[];
  onClickClose: () => void;
}

export default function SeelWFPInfoView({
  title = '',
  price = '',
  continent = '',
  coverageDetailsText = [],
  onClickClose = () => {},
}: SeelWFPInfoViewProps) {
  const spacing = 12;
  const margin = 6;
  const marginTop = 15;
  const h1 = "We've Got You Covered";
  return (
    <View style={[defaultStyles.container]}>
      <ImageBackground
        resizeMode="center"
        source={require('../assets/images/background_image.jpg')}
        style={defaultStyles.imageBackground}
      >
        {/* <View style={[{ padding: spacing }, defaultStyles.titleContainer]}>
          <View style={defaultStyles.seelLogoContainer}>
            <Image
              source={require('../assets/images/seel_logo.png')}
              style={defaultStyles.seelLogoIcon}
            />
            <TouchableOpacity>
              <Image
                source={require('../assets/images/close_white.png')}
                style={defaultStyles.closeIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={[defaultStyles.h1]}>{h1}</Text>
          <Text style={[{ marginTop: margin }, defaultStyles.h3]}>{price}</Text>
        </View>
        <View></View> */}
      </ImageBackground>
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
          <Text style={[defaultStyles.h1]}>{h1}</Text>
          <Text style={[{ marginTop: margin }, defaultStyles.h3]}>
            Only {price} for Complete Peace of Mind
          </Text>
        </View>
        <View style={[{ padding: spacing }, defaultStyles.contentContainer]}>
          <Text style={defaultStyles.h2}>{title}</Text>
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
              What's Covered
            </Text>
          </View>
          <ScrollView
            horizontal={false}
            showsVerticalScrollIndicator={false}
            style={[defaultStyles.scrollViewContainer]}
          >
            <View
              style={[
                { marginTop: spacing },
                defaultStyles.scrollViewContentContainer,
              ]}
            >
              {continent === 'US' ? (
                <Text style={defaultStyles.h4}>
                  Get a Full Refund, No Questions Asked
                </Text>
              ) : null}
              {continent === 'EU' ? (
                <Text style={defaultStyles.h4}>
                  In addition to your standard coverage under consumer
                  protection laws for:
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
            {continent === 'US' ? (
              <View
                style={[
                  { marginTop: spacing },
                  defaultStyles.scrollViewContentContainer,
                ]}
              >
                <Text style={defaultStyles.h4}>Easy Resolution</Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  Resolve your issues with just a few clicks
                </Text>
                <Text style={[{ marginTop: marginTop }, defaultStyles.h4]}>
                  Complete Peace of Mind
                </Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  • Zero-risk on your order with our protection
                </Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  • Get your refund promptly
                </Text>
              </View>
            ) : null}
            {continent === 'EU' ? (
              <View
                style={[
                  { marginTop: spacing },
                  defaultStyles.scrollViewContentContainer,
                ]}
              >
                <Text style={defaultStyles.h4}>
                  Worry-Fee Purchase® provides the following protection:
                </Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  • Extended return windows – Seven (7) additional days to
                  decide 
                </Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  • Post-delivery theft coverage – Protection for packages
                  stolen or missing after delivery
                </Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  • Delay compensation if the items are not delivered within 10
                  days
                </Text>

                <Text style={[{ marginTop: marginTop }, defaultStyles.h4]}>
                  Shoppers also get white glove concierge help with post
                  purchase issues and mishaps;
                </Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  • Access to desktop and mobile app
                </Text>
                <Text style={[{ marginTop: margin }, defaultStyles.p]}>
                  • Live, instant support
                </Text>
              </View>
            ) : null}
          </ScrollView>
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
    aspectRatio: 1,
    // backgroundColor: '#ffffff',
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
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 800,
  },
  h2: {
    height: 36,
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    textAlign: 'center',
  },
  h3: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
  },
  h4: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
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
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
  },
});
