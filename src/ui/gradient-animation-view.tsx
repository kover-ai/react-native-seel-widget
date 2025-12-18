import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import type { ViewStyle } from 'react-native';

export interface GradientAnimationViewProps {
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

export interface GradientAnimationViewRef {
  /**
   * Show the content with gradient animation
   */
  show: () => void;
  /**
   * Hide the content with gradient animation
   */
  hide: () => void;
  /**
   * Toggle visibility
   */
  toggle: () => void;
}

const GradientAnimationView = forwardRef<
  GradientAnimationViewRef,
  GradientAnimationViewProps
>(
  (
    { containerStyle, initialVisible = false, animationDuration = 400 },
    ref
  ) => {
    const [visible, setVisible] = useState(initialVisible);
    // Initialize gradient width: 0 = visible, large value = hidden
    const gradientWidth = useRef(
      new Animated.Value(initialVisible ? 0 : 1000)
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
          toValue: 1000, // Large value to cover the content
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
        <View style={styles.contentContainer}>
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

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  contentContainer: {
    position: 'relative',
    overflow: 'hidden',
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});

export default GradientAnimationView;
