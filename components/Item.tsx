import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

function Item({ item }) {
  const rippleOpacity1 = useSharedValue(1);
  const scale1 = useSharedValue(0.1);
  const rippleOpacity2 = useSharedValue(1);
  const scale2 = useSharedValue(0.1);
  const rippleOpacity3 = useSharedValue(1);
  const scale3 = useSharedValue(0.1);

  useEffect(() => {
    setTimeout(() => {
      rippleOpacity1.value = withRepeat(withTiming(0, { duration: 2500 }), -1);
      scale1.value = withRepeat(withTiming(1, { duration: 2500 }), -1);
    }, 200);
    setTimeout(() => {
      rippleOpacity2.value = withRepeat(withTiming(0, { duration: 2500 }), -1);
      scale2.value = withRepeat(withTiming(1, { duration: 2500 }), -1);
    }, 400);
    setTimeout(() => {
      rippleOpacity3.value = withRepeat(withTiming(0, { duration: 2500 }), -1);
      scale3.value = withRepeat(withTiming(1, { duration: 2500 }), -1);
    }, 800);
  }, []);

  const rStyle1 = useAnimatedStyle(() => {
    return {
      opacity: rippleOpacity1.value,
      transform: [{ scale: scale1.value }],
    };
  });

  const rStyle2 = useAnimatedStyle(() => {
    return {
      opacity: rippleOpacity2.value,
      transform: [{ scale: scale2.value }],
    };
  });

  const rStyle3 = useAnimatedStyle(() => {
    return {
      opacity: rippleOpacity3.value,
      transform: [{ scale: scale3.value }],
    };
  });

  return (
    <>
      <Animated.View
        style={[styles.button, { left: item.x }, { bottom: item.y }, rStyle1]}
      ></Animated.View>
      <Animated.View
        style={[styles.button, { left: item.x }, { bottom: item.y }, rStyle2]}
      ></Animated.View>
      <Animated.View
        style={[styles.button, { left: item.x }, { bottom: item.y }, rStyle3]}
      ></Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  button: {
    position: "absolute",
    borderRadius: 50,
    backgroundColor: "blue",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  core: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#063970",
    position: "absolute",
    transform: [{ scale: 0.15 }],
  },
});

export default Item;
