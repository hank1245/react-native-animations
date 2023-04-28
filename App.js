import { FlatList, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import ListItem from "./components/ListItem";
import { useSharedValue } from "react-native-reanimated";

const data = new Array(50).fill(0).map((_, index) => ({ id: index }));

export default function App() {
  const viewableItems = useSharedValue([]);

  const onViewableItemsChanged = ({ viewableItems: items }) => {
    viewableItems.value = items;
  };
  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{ paddingVertical: 40 }}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={({ item }) => {
          return <ListItem item={item} viewableItems={viewableItems} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
