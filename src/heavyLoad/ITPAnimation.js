import React from "react";
import { View, Text, StyleSheet } from "react-native";

const COLOR1 = opacity => `rgba(63, 104, 28, ${opacity})`;
const COLOR2 = opacity => `rgba(17, 13, 149, ${opacity})`;

const ITPAnimation = ({ value, rotation }) => (
  <View>
    <View
      style={{
        position: "absolute",
        width: 100,
        height: 100,
        transform: [{ scale: value }, { rotate: rotation }],
        backgroundColor: COLOR1(value)
      }}
    />
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 100,
        backgroundColor: COLOR2(1 - value)
      }}
    >
      <Text style={{ color: "white", fontSize: value * 30 }}>
        In the Pocket
      </Text>
    </View>
  </View>
);

export default ITPAnimation;
