/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getUserDetails } from "../../service/githubService";
import MembersScreen from "../../common/MembersScreen";

export default class DetailContainer extends Component {
  state = {
    users: []
  };

  componentWillMount() {
    this.props.selectedMembers.forEach(login =>
      getUserDetails(login).then(this.addUser)
    );
  }

  addUser = user => {
    this.setState({
      users: [...this.state.users, user]
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <MembersScreen members={this.state.users} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
