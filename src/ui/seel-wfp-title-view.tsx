import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';

export interface SeelWFPTitleViewProps {
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
}

export default function SeelWFPTitleView({
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
  onClickInfoIcon,
}: SeelWFPTitleViewProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () =>
    setIsEnabled((previousState: any) => !previousState);

  return (
    <View style={_constainerStyle}>
      <Image
        style={defaultStyles.seelIcon}
        source={require('../assets/images/seel_icon.png')}
      />
      <View style={defaultStyles.middleContainer}>
        <View style={defaultStyles.titleContainer}>
          <Text style={_titleStyle}>{title}</Text>
          <Text style={_priceStyle}>for - {price}</Text>
          {renderInfoButton()}
        </View>
        <View style={defaultStyles.poweredByContainer}>
          <Text style={_poweredByText}>{'Powered by'}</Text>
          <Image
            style={defaultStyles.seelWordIcon}
            source={require('../assets/images/seel_word.png')}
          />
        </View>
      </View>
      <Switch
        style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
        trackColor={{ false: '#767577', true: '#2121C4' }}
        thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  lightContainerStyle: {
    backgroundColor: 'white',
  },
  darkContainerStyle: {
    backgroundColor: '#121212',
  },
  seelIcon: {
    width: 24,
    height: 24,
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
    fontSize: 12,
    fontWeight: '600',
  },
  lightTitleStyle: {
    color: '#000000',
  },
  darkTitleStyle: {
    color: '#ffffff',
  },
  price: {
    marginLeft: 4,
    fontSize: 10,
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
    fontSize: 7.5,
    fontWeight: '600',
    lineHeight: 10,
  },
  lightPoweredByText: {
    color: '#565656',
  },
  dartPoweredByText: {
    color: 'white',
  },
  seelWordIcon: {
    width: 20,
    height: 10,
  },
});
