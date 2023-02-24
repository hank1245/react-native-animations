import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";
import { withRepeat } from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";
import { withTiming } from "react-native-reanimated";
import { Svg, Circle, Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const AnimatedCircle = Animated.createAnimatedComponent<any>(Circle);

export default function App() {
  const progress = useSharedValue(0);
  const acc = useSharedValue(1);

  const circum = 300;
  const r = circum / (2 * Math.PI);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circum * progress.value,
  }));

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(3, { duration: 2000, easing: Easing.linear }),
      -1
    );
  }, []);

  return (
    <View style={styles.container}>
      <Svg>
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={r}
          stroke={"green"}
          strokeWidth={10}
          strokeDasharray={50}
          animatedProps={animatedProps}
        />
        <Path
          d={`M${width / 2 - 150},${height / 2 - 80},${width / 2 + 150},${
            height / 2 - 80
          },${width / 2},${height / 2 + 150}z`}
          fill={"none"}
          stroke={"black"}
          strokeWidth={20}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
