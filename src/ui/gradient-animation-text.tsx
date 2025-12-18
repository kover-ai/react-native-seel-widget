import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';

export interface GradientAnimationTextProps {
  /**
   * Text content to display
   */
  text?: string;
  /**
   * Custom text style
   */
  textStyle?: TextStyle;
  /**
   * Custom container style
   */
  containerStyle?: ViewStyle;
  /**
   * Initial visibility state (default: false)
   */
  initialVisible?: boolean;
  /**
   * Animation duration in milliseconds (default: 300)
   */
  animationDuration?: number;
}

export interface GradientAnimationTextRef {
  /**
   * Show the text with gradient animation
   */
  show: () => void;
  /**
   * Hide the text with gradient animation
   */
  hide: () => void;
  /**
   * Toggle visibility
   */
  toggle: () => void;
}

const GradientAnimationText = forwardRef<
  GradientAnimationTextRef,
  GradientAnimationTextProps
>(
  (
    {
      text = '',
      textStyle,
      containerStyle,
      initialVisible = true,
      animationDuration = 300,
    },
    ref
  ) => {
    const [visible, setVisible] = useState(initialVisible);
    const gradientWidth = useRef(
      new Animated.Value(initialVisible ? 0 : 100)
    ).current;

    useImperativeHandle(ref, () => ({
      show: () => {
        setVisible(true);
        Animated.timing(gradientWidth, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: false,
        }).start();
      },
      hide: () => {
        Animated.timing(gradientWidth, {
          toValue: 1000, // Large value to cover the text
          duration: animationDuration,
          useNativeDriver: false,
        }).start(() => {
          setVisible(false);
        });
      },
      toggle: () => {
        if (visible) {
          // Hide
          Animated.timing(gradientWidth, {
            toValue: 1000,
            duration: animationDuration,
            useNativeDriver: false,
          }).start(() => {
            setVisible(false);
          });
        } else {
          // Show
          setVisible(true);
          Animated.timing(gradientWidth, {
            toValue: 0,
            duration: animationDuration,
            useNativeDriver: false,
          }).start();
        }
      },
    }));

    if (!visible) {
      return null;
    }

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, textStyle]}>{text}</Text>
          {/* Gradient mask layer - from left to right */}
          <Animated.View
            style={[
              styles.gradientMask,
              {
                width: gradientWidth,
              },
            ]}
            pointerEvents="none"
          >
            {/* Create gradient effect: from transparent to white */}
            <View style={styles.gradientOverlay}>
              <View style={styles.gradientLeft} />
              <View style={styles.gradientRight} />
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
);

// GradientAnimationText.displayName = 'GradientAnimationText';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  textContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
    color: '#333333',
  },
  gradientMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    height: '100%',
    overflow: 'hidden',
  },
  gradientOverlay: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  gradientLeft: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  gradientRight: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default GradientAnimationText;
