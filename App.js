import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import BackgroundImg from "./assets/image.jpeg";
import React, { useRef, useState } from "react";
import { PinchGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  withTiming,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const { width, height } = Dimensions.get("window");

export default function App() {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: (event, context) => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: () => {
      scale.value = withTiming(1);
    },
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -(width * 0.8) / 2 },
        { translateY: -(height * 0.8) / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: (width * 0.8) / 2 },
        { translateY: (height * 0.8) / 2 },
      ],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={styles.animationContainer}>
        <AnimatedImage
          source={BackgroundImg}
          style={[styles.background, reanimatedStyle]}
        />
      </Animated.View>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  animationContainer: {
    flex: 1,
    backgroundColor: "#4f5555",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: width * 0.8,
    height: height * 0.8,
  },
});
