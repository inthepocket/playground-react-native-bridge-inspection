// @flow

import React, { Component } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  View,
  Button
} from "react-native";
import MembersScreen from "../../common/MembersScreen";
import DetailContainer from "./DetailContainer";
import { getOrganisationMembers } from "../../service/githubService";

export default class StateContainer extends Component {
  static childContextTypes = {
    color: () => {}
  };

  state = {
    members: [],
    selectedMembers: [],
    detailScreen: false,
    color: "red"
  };

  getChildContext() {
    return { color: this.state.color };
  }

  componentWillMount() {
    getOrganisationMembers("inthepocket").then(this.addMembers);
    getOrganisationMembers("facebook").then(this.addMembers);
  }

  addMembers = members =>
    this.setState({
      members: [...this.state.members, ...members]
    });

  addSelectedMember = login =>
    this.setState({ selectedMembers: [...this.state.selectedMembers, login] });

  removeSelectedMember = login =>
    this.setState({
      selectedMembers: this.state.selectedMembers.filter(
        member => member !== login
      )
    });

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Button
            title="Change color"
            onPress={() =>
              this.setState({
                color: this.state.color === "purple" ? "red" : "purple"
              })
            }
          />
          {this.state.selectedMembers.length > 0 && (
            <Button
              style={{ marginTop: 10 }}
              title={
                this.state.detailScreen
                  ? "Go to overview"
                  : "Show selected members"
              }
              onPress={() =>
                this.setState({ detailScreen: !this.state.detailScreen })
              }
            />
          )}
        </View>
        {this.state.detailScreen ? (
          <DetailContainer selectedMembers={this.state.selectedMembers} />
        ) : (
          <MembersScreen
            members={this.state.members}
            selectedMembers={this.state.selectedMembers}
            onSelect={this.addSelectedMember}
            onDeselect={this.removeSelectedMember}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "black",
    width: Dimensions.get("window").width,
    flex: 1
  },
  header: {
    height: 60
  },
  container: {
    flex: 1
  },
  contentContainer: {
    padding: 50,
    alignItems: "center"
  }
});
