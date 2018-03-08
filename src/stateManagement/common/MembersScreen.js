/* @flow */

import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import Member from "./Member";

const MembersScreen = ({
  members,
  selectedMembers = [],
  onSelect = () => {},
  onDeselect = () => {}
}) => (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.contentContainer}
  >
    {members.map(member => {
      const isSelected = selectedMembers.indexOf(member.login) !== -1;

      return (
        <Member
          key={member.id}
          member={member}
          onSelect={onSelect}
          onDeselect={onDeselect}
          isSelected={isSelected}
        />
      );
    })}
  </ScrollView>
);

export default MembersScreen;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "black"
  },
  header: {
    height: 40
  },
  contentContainer: {
    padding: 50,
    alignItems: "center"
  }
});
