import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
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
   * Whether to start animation automatically (default: true)
   */
  autoStart?: boolean;
  /**
   * Animation duration in milliseconds for one cycle (default: 1500)
   */
  animationDuration?: number;
  /**
   * Gradient colors for loading effect (default: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0)'])
   */
  gradientColors?: string[];
}

export interface GradientAnimationTextRef {
  /**
   * Start the loading animation
   */
  start: () => void;
  /**
   * Stop the loading animation
   */
  stop: () => void;
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
      autoStart = true,
      animationDuration = 1500,
      gradientColors = [
        'rgba(255, 255, 255, 0.3)',
        'rgba(255, 255, 255, 0.6)',
        'rgba(255, 255, 255, 0.3)',
      ],
    },
    ref
  ) => {
    // Use a larger range for smoother animation across the container
    const translateX = useRef(new Animated.Value(-300)).current;
    const animationRef = useRef<any>(null);

    const startAnimation = useCallback(() => {
      // Stop existing animation if any
      if (animationRef.current) {
        animationRef.current.stop();
      }
      // Reset position to start (off-screen left)
      translateX.setValue(-300);
      // Create loop animation (move from left to right)
      animationRef.current = Animated.loop(
        Animated.timing(translateX, {
          toValue: 300,
          duration: animationDuration,
          useNativeDriver: true,
        })
      );
      animationRef.current.start();
    }, [animationDuration, translateX]);

    const stopAnimation = useCallback(() => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    }, []);

    useImperativeHandle(ref, () => ({
      start: startAnimation,
      stop: stopAnimation,
    }));

    useEffect(() => {
      if (autoStart) {
        startAnimation();
      }
      return () => {
        stopAnimation();
      };
    }, [autoStart, startAnimation, stopAnimation]);

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, textStyle]}>{text}</Text>
          {/* Gradient loading effect - moving from left to right */}
          <Animated.View
            style={[
              styles.gradientMask,
              {
                transform: [{ translateX }],
              },
            ]}
            pointerEvents="none"
          >
            {/* Create gradient effect with three colors */}
            <View style={styles.gradientOverlay}>
              <View
                style={[
                  styles.gradientSection,
                  { backgroundColor: gradientColors[0] },
                ]}
              />
              <View
                style={[
                  styles.gradientSection,
                  { backgroundColor: gradientColors[1] },
                ]}
              />
              <View
                style={[
                  styles.gradientSection,
                  { backgroundColor: gradientColors[2] },
                ]}
              />
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
    width: 300,
    height: '100%',
    overflow: 'hidden',
  },
  gradientOverlay: {
    flex: 1,
    flexDirection: 'row',
    width: 300,
    height: '100%',
  },
  gradientSection: {
    flex: 1,
  },
});

export default GradientAnimationText;
