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
import {
  PinchGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { MOCK_DATA } from "./constant";
import Item from "./components/Item";

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
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.View style={styles.animationContainer}>
          <AnimatedImage
            source={BackgroundImg}
            style={[styles.background, reanimatedStyle]}
          />
          {MOCK_DATA.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4f5555",
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
    width: width,
    height: height,
  },
});
