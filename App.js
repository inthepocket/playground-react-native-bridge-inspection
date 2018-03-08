import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import bridgeChecker from "./helpers/bridgeChecker";
import HeavyLoadContainer from "./src/heavyLoad";
import ScrollFunContainer from "./src/animations/ScrollFun";
import StateContainer from "./src/stateManagement/screens/componentState/ComponentStateContainer";
import JsSingletonContainer from "./src/stateManagement/screens/jsSingleton/JsSingletonContainer";
import ContextApiContainer from "./src/stateManagement/screens/contextAPI/ContextApiContainer";

const SCREEN_ID = {
  HEAVY_LOAD: "HEAVY_LOAD",
  SCROLL_FUN: "SCROLL_FUN",
  COMPONENT_STATE: "COMPONENT_STATE",
  JS_SINGLETON: "JS_SINGLETON",
  CONTEXT: "CONTEXT",
  REDUX: "REDUX"
};

export default class App extends React.Component {
  state = {
    activeScreen: null
  };

  componentWillMount() {
    // bridgeChecker.inspectExistingNativeModules();
    // bridgeChecker.inspect({ nativeModule: "UIManager", bundleSize: 1 });
    bridgeChecker.inspectTotalTraffic({
      nativeModule: "UIManager",
      bundleSize: 100
    });
  }

  reset = () => {
    bridgeChecker.reset();
  };

  renderActiveScreen = () => {
    console.log(this.state.activeScreen);
    console.log(SCREEN_ID.HEAVY_LOAD);
    switch (this.state.activeScreen) {
      case SCREEN_ID.HEAVY_LOAD:
        return <HeavyLoadContainer onReset={this.reset} />;
      case SCREEN_ID.SCROLL_FUN:
        return <ScrollFunContainer />;
      case SCREEN_ID.COMPONENT_STATE:
        return <StateContainer />;
      case SCREEN_ID.JS_SINGLETON:
        return <JsSingletonContainer />;
      case SCREEN_ID.CONTEXT:
        return <ContextApiContainer />;
      default:
        return <Text>Not implemented yet</Text>;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.state.activeScreen && [
          <View key={1}>
            <Text style={styles.title}>RN Under the hood</Text>
            <Button
              title={"Heavy Load Demo"}
              onPress={() =>
                this.setState({ activeScreen: SCREEN_ID.HEAVY_LOAD })
              }
            />
            <Button
              title={"Scroll Animation Demo"}
              onPress={() =>
                this.setState({ activeScreen: SCREEN_ID.SCROLL_FUN })
              }
            />
          </View>,
          <View key={2}>
            <Text style={styles.title}>State Management</Text>
            <Button
              title={"Component State"}
              onPress={() =>
                this.setState({ activeScreen: SCREEN_ID.COMPONENT_STATE })
              }
            />
            <Button
              title={"JS Singleton"}
              onPress={() =>
                this.setState({ activeScreen: SCREEN_ID.JS_SINGLETON })
              }
            />
            <Button
              title={"React Context API"}
              onPress={() => this.setState({ activeScreen: SCREEN_ID.CONTEXT })}
            />
            <Button
              title={"Redux"}
              onPress={() => this.setState({ activeScreen: SCREEN_ID.REDUX })}
            />
          </View>
        ]}
        {this.state.activeScreen && this.renderActiveScreen()}
        <View style={styles.header}>
          {this.state.activeScreen && (
            <Button
              title="Back"
              onPress={() => this.setState({ activeScreen: null })}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around"
  },
  header: {
    position: "absolute",
    bottom: 10,
    left: 0
  },
  row: {
    flexDirection: "row"
  },
  title: {
    fontSize: 20,
    alignSelf: "center"
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "green",
    borderRadius: 6
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "black"
  }
});
