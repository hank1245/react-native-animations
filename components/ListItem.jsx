import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

function ListItem({ item, viewableItems }) {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === item.id)
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  });

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
