import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import useAnimatedVisibility from "../hooks/useAnimationVisibility";
function ListItem({ item, viewableItems }) {
  const rStyle = useAnimatedVisibility(viewableItems, item);

  return (
    <Animated.View
      style={[
        {
          height: 80,
          width: "90%",
          backgroundColor: "#6f36c9",
          marginTop: 20,
          borderRadius: 10,
          alignSelf: "center",
        },
        rStyle,
      ]}
    />
  );
}

export default ListItem;
