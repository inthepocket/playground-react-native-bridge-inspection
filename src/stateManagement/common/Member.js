// @flow

import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { type TMember } from "../service/githubService";

const Member = (props: TMember, context = {}) => {
  const {
    member: {
      avatar_url,
      login,
      organisation,
      id,
      name,
      location,
      public_repos,
      company,
      followers
    },
    onSelect,
    onDeselect,
    isSelected
  } = props;
  const avatar = (
    <View style={styles.view}>
      <Image source={{ uri: avatar_url }} style={styles.image} />
    </View>
  );

  const text = (
    <View style={[styles.view, { flex: 2 }]}>
      <Text style={[styles.login, { fontSize: 18 }]}>{name || login}</Text>
      <Text style={styles.login}>Company: {organisation || company}</Text>
      {location && <Text style={styles.login}>{location}</Text>}
      {followers && <Text style={styles.login}>Followers: {followers}</Text>}
      {public_repos && (
        <Text style={styles.login}>Public repo's: {public_repos}</Text>
      )}
    </View>
  );

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && {
          backgroundColor: context.color || "rgba(63, 104, 28, 1)"
        }
      ]}
      onPress={() => (isSelected ? onDeselect(login) : onSelect(login))}
    >
      {avatar}
      {text}
    </TouchableOpacity>
  );
};

export default Member;

Member.contextTypes = {
  color: () => {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // height: 70,
    marginBottom: 20,
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "powderblue",
    borderRadius: 35
  },
  view: {
    flex: 1,
    justifyContent: "space-around"
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  login: {
    fontSize: 13,
    textAlignVertical: "center"
  }
});
