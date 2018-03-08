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
import { getState, setState } from "./state";

export default class StateContainer extends Component {
  state = {
    detailScreen: false
  };

  _set = setState.bind(this);

  componentWillMount() {
    getOrganisationMembers("inthepocket").then(this.addMembers);
    getOrganisationMembers("facebook").then(this.addMembers);
  }

  addMembers = members => {
    this._set({
      members: [...getState().members, ...members]
    });
  };

  addSelectedMember = login => {
    this._set({ selectedMembers: [...getState().selectedMembers, login] });
  };

  removeSelectedMember = login => {
    this._set({
      selectedMembers: getState().selectedMembers.filter(
        member => member !== login
      )
    });
    this.forceUpdate();
  };

  render() {
    const state = getState();
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          {state.selectedMembers.length > 0 && (
            <Button
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
          <DetailContainer selectedMembers={state.selectedMembers} />
        ) : (
          <MembersScreen
            members={state.members}
            selectedMembers={state.selectedMembers}
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
    height: 40
  },
  container: {
    flex: 1
  },
  contentContainer: {
    padding: 50,
    alignItems: "center"
  }
});
