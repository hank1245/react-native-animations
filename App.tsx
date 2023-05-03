import { translate } from "@shopify/react-native-skia";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function App() {
  const translateX = useSharedValue(0);
  const onPanGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, context) => {
      context.x = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: () => {
      if (translateX.value <= width / 3) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(width / 2);
      }
    },
  });
  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, width / 2],
      [0, 3],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      translateX.value,
      [0, width / 2],
      [0, 18],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [
        { perspective: 120 },
        {
          translateX: translateX.value,
        },
        { rotateY: `${-rotate}deg` },
      ],
    };
  });

  const onPress = useCallback(() => {
    if (translateX.value > 0) {
      translateX.value = withTiming(0);
    } else {
      translateX.value = withTiming(width / 2);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="inverted" />
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onPanGesture}>
          <Animated.View
            style={[{ backgroundColor: "white", width, height }, rStyle]}
          >
            <Feather
              name="menu"
              size={48}
              color="black"
              style={{ margin: 15 }}
              onPress={onPress}
            />
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e23",
  },
});
