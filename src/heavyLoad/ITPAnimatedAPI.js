import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const COLOR1 = opacity => `rgba(63, 104, 28, ${opacity})`;
const COLOR2 = opacity => `rgba(17, 13, 149, ${opacity})`;
const SIZE = 100;

const ITPAnimation = ({
  value,
  rotation,
  backgroundColor1,
  backgroundColor2,
  fontSize
}) => (
  <View>
    <Animated.View
      style={{
        position: "absolute",
        width: SIZE,
        height: SIZE,
        transform: [
          // { scale: value },
          { rotate: rotation }
        ],
        backgroundColor: backgroundColor1
      }}
    />
    <Animated.View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: SIZE,
        height: SIZE,
        backgroundColor: backgroundColor2
      }}
    >
      <Animated.Text style={{ color: "white", fontSize }}>
        In the Pocket
      </Animated.Text>
    </Animated.View>
  </View>
);

export default ITPAnimation;
