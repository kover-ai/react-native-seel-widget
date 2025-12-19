import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';
import KeyValue from '../constants/key_value';
import GradientAnimationText, {
  type GradientAnimationTextRef,
} from './gradient-animation-text';
import { useRef } from 'react';
import { NetworkRequestStatueEnum } from '../constants/network_request_statue_enum';

export interface SeelWFPTitleViewProps {
  status: string;
  /**
   * Title text to display
   */
  title?: string;
  /**
   * Price text to display
   */
  price?: string;
  /**
   * Custom container style
   */
  containerStyle?: ViewStyle;
  /**
   * Custom container style for dark mode
   */
  darkContainerStyle?: ViewStyle;
  /**
   * Custom container style for light mode
   */
  lightContainerStyle?: ViewStyle;
  /**
   * Custom title text style
   */
  titleStyle?: TextStyle;
  /**
   * Custom title text style for dark mode
   */
  darkTitleStyle?: TextStyle;
  /**
   * Custom title text style for light mode
   */
  lightTitleStyle?: TextStyle;
  /**
   * Custom price text style
   */
  priceStyle?: TextStyle;
  /**
   * Custom price text style for dark mode
   */
  darkPriceStyle?: TextStyle;
  /**
   * Custom price text style for light mode
   */
  lightPriceStyle?: TextStyle;
  /**
   * Callback function when title is pressed
   * @param route - Route name or path to navigate to
   */
  onClickInfoIcon?: (route?: string) => void;
  /**
   * Route name or path for navigation (optional, can be used with onClickInfoIcon)
   */
  route?: string;
  /**
   * Whether the title is pressable (default: true if onClickInfoIcon is provided)
   */
  pressable?: boolean;
  optedIn: boolean;
  dictionary: any;
  loadingStatue: NetworkRequestStatueEnum;
  onChangeOptedInValue: (optedIn: boolean) => void;
}

export default function SeelWFPTitleView({
  status,
  title,
  price,
  containerStyle,
  lightContainerStyle,
  darkContainerStyle,
  titleStyle,
  lightTitleStyle,
  darkTitleStyle,
  priceStyle,
  lightPriceStyle,
  darkPriceStyle,
  optedIn = false,
  dictionary = {},
  loadingStatue = NetworkRequestStatueEnum.Idle,
  onClickInfoIcon,
  onChangeOptedInValue = (_: boolean) => {},
}: SeelWFPTitleViewProps) {
  const gradientViewRef = useRef<GradientAnimationTextRef>(null);

  const colorScheme = useColorScheme();
  const isDark = false && colorScheme === 'dark';

  const _constainerStyle = [
    defaultStyles.container,
    containerStyle,
    isDark
      ? defaultStyles.darkContainerStyle
      : defaultStyles.lightContainerStyle,
    isDark ? darkContainerStyle : lightContainerStyle,
  ];

  const _titleStyle = [
    defaultStyles.title,
    titleStyle,
    isDark ? defaultStyles.darkTitleStyle : defaultStyles.lightTitleStyle,
    isDark ? darkTitleStyle : lightTitleStyle,
  ];

  const _priceStyle = [
    defaultStyles.price,
    priceStyle,
    isDark ? defaultStyles.darkPriceStyle : defaultStyles.lightPriceStyle,
    isDark ? darkPriceStyle : lightPriceStyle,
  ];

  const _poweredByText = [
    defaultStyles.poweredByText,
    isDark ? defaultStyles.dartPoweredByText : defaultStyles.lightPoweredByText,
  ];

  const renderInfoButton = () => {
    return (
      <TouchableOpacity
        style={defaultStyles.infoIconButton}
        hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
        onPress={() => {
          console.log('Push To Info Page');
          if (!!onClickInfoIcon && typeof onClickInfoIcon === 'function') {
            onClickInfoIcon();
          }
        }}
      >
        <Image
          style={defaultStyles.infoIcon}
          source={require('../assets/images/info_black.png')}
        />
      </TouchableOpacity>
    );
  };

  const paddingTop = 4;
  const paddingBottom = 4;
  const paddingLeft = 22 + 6;
  const alignItems = 'flex-start';
  const renderTickView = (value: string) => {
    return (
      <View
        style={[
          defaultStyles.rowContainer,
          { paddingTop, paddingBottom, paddingLeft, alignItems },
        ]}
      >
        <View style={defaultStyles.tickIconContainer}>
          <Image
            style={defaultStyles.tickIcon}
            source={require('../assets/images/tick_small_minor.png')}
          />
        </View>
        <Text style={defaultStyles.tickText}>{value}</Text>
      </View>
    );
  };
  const gradientContainerStyle = {
    marginLeft: 4,
    width: 60,
    height: 18,
    borderRadius: 4,
    backgroundColor: '#e3e3e3',
  };
  return (
    <View style={_constainerStyle}>
      <View style={defaultStyles.rowContainer}>
        <TouchableOpacity
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          onPress={() => {
            onChangeOptedInValue(!optedIn);
          }}
        >
          <Image
            source={
              optedIn
                ? require('../assets/images/checkbox_selected.png')
                : require('../assets/images/checkbox_normal.png')
            }
            style={defaultStyles.checkboxIcon}
          />
        </TouchableOpacity>
        <View style={defaultStyles.middleContainer}>
          <View style={defaultStyles.titleContainer}>
            <Text style={[_titleStyle]} adjustsFontSizeToFit>
              {title}
            </Text>
            <Text style={_priceStyle} adjustsFontSizeToFit>
              for
            </Text>
            {/* eslint-disable-next-line no-bitwise */}
            {(loadingStatue & NetworkRequestStatueEnum.Loading) === 0 ? (
              <Text style={_priceStyle} adjustsFontSizeToFit>
                {price}
              </Text>
            ) : (
              <View>
                <GradientAnimationText
                  ref={gradientViewRef}
                  containerStyle={gradientContainerStyle}
                  animationDuration={5000}
                />
              </View>
            )}
            {renderInfoButton()}
          </View>
        </View>
      </View>
      <View style={[defaultStyles.columnContainer]}>
        {status === 'accepted' &&
          renderTickView(dictionary[KeyValue.wfp_subtitle] ?? '')}
        {status === 'accepted' &&
          renderTickView(dictionary[KeyValue.wfp_description] ?? '')}
        {status === 'rejected' && (
          <View
            style={[
              defaultStyles.rowContainer,
              { paddingTop, paddingBottom, paddingLeft, alignItems },
            ]}
          >
            <Text style={defaultStyles.tickText}>
              {dictionary[KeyValue.ineligible_title] ?? ''}
            </Text>
          </View>
        )}
      </View>
      <View
        style={[
          defaultStyles.rowContainer,
          { paddingTop, paddingLeft, alignItems },
        ]}
      >
        <View style={defaultStyles.poweredByContainer}>
          <Text style={[_poweredByText]}>
            {dictionary[KeyValue.powered_by] ?? 'Powered by'}
          </Text>
          <Image
            style={defaultStyles.seelWordIcon}
            source={require('../assets/images/seel_word.png')}
          />
        </View>
      </View>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 24,
  },
  lightContainerStyle: {
    backgroundColor: 'white',
  },
  darkContainerStyle: {
    backgroundColor: '#121212',
  },
  columnContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxIcon: {
    width: 16.5,
    height: 16.5,
  },
  seelIcon: {
    width: 20,
    height: 20,
  },
  middleContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 6,
    paddingRight: 6,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#000000',
    fontFamily: Platform.select({
      ios: 'Open Sans',
    }),
    fontSize: 15,
    fontWeight: 700,
    lineHeight: 20,
  },
  lightTitleStyle: {
    color: '#000000',
  },
  darkTitleStyle: {
    color: '#ffffff',
  },
  price: {
    marginLeft: 4,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'regular',
  },
  lightPriceStyle: {
    color: '#000000',
  },
  darkPriceStyle: {
    color: '#ffffff',
  },
  infoIconButton: {
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    width: 12,
    height: 12,
  },
  poweredByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  poweredByText: {
    color: '#565656',
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 16,
  },
  lightPoweredByText: {
    color: '#565656',
  },
  dartPoweredByText: {
    color: 'white',
  },
  tickIconContainer: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickIcon: {
    width: 15,
    height: 15,
  },
  tickText: {
    color: '#191919',
    fontFamily: Platform.select({
      ios: 'Inter',
    }),
    fontSize: 11,
    fontWeight: 300,
    lineHeight: 18,
  },
  seelWordIcon: {
    width: 32,
    height: 16,
  },
});
