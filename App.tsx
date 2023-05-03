import { translate } from "@shopify/react-native-skia";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function App() {
  const translateX = useSharedValue(0);
  const onPanGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>(
    {
      onActive: (event) => {
        translateX.value = event.translationX;
      },
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="inverted" />
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onPanGesture}>
          <Animated.View style={{ backgroundColor: "white", width, height }} />
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
