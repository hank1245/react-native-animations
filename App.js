import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
} from "react-native";
import BackgroundImg from "./assets/image.jpeg";
import React, { useState, createRef, useEffect } from "react";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import { PressableScale } from "react-native-pressable-scale";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { translate } from "@shopify/react-native-skia";

const handleRotation = (progress) => {
  "worklet";
  return `${progress.value * 2 * Math.PI}rad`;
};

export default function App() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler({
    onStart: (e, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (e, context) => {
      translateX.value = e.translationX + context.translateX;
      translateY.value = e.translationY + context.translateY;
    },
    onEnd: (e, context) => {
      if (translateX.value ** 2 + translateY.value ** 2 < 40000) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(1);
      }
    },
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.circle}></View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.square, reanimatedStyle]} />
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    position: "relative",
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "rgba(0,0,256,0.5)",
  },
  circle: {
    width: 400,
    height: 400,
    borderRadius: "400",
    position: "absolute",
    borderColor: "green",
    borderWidth: 10,
  },
});
