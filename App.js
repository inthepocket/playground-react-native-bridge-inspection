import React from 'react';
import { StyleSheet, Text, View, Animated, Switch } from 'react-native';
import bridgeChecker from './helpers/bridgeChecker';
import ITPAnimation from './components/ITPAnimation';
import ITPAnimatedAPI from './components/ITPAnimatedAPI';

const COLOR1 = (opacity) => `rgba(63, 104, 28, ${opacity})`;
const COLOR2 = (opacity) => `rgba(17, 13, 149, ${opacity})`;

export default class App extends React.Component {

  state = {
    value: 0,
    simulateBusyApp: false,
    useAnimationAPI: false,
    useNativeDriver: false
  }
  animatedValue = new Animated.Value(0);

  componentWillMount() {
    bridgeChecker.inspectExistingNativeModules();
    // bridgeChecker.inspect({ nativeModule: 'UIManager', bundleSize: 1})
    bridgeChecker.inspectTotalTraffic({ nativeModule: 'UIManager', bundleSize: 5000});
    // EXAMPLE 1
    this.state.useAnimationAPI ? this.startAnimationLoop() : this.startTimer();
  }

  startTimer = () => {
    this.interval = setInterval(
      () => {
        const calculatedValue = this.state.value >= 0.99 ? 0 : Math.round((this.state.value + 0.01) * 1000) / 1000;
        this.setState({ value: calculatedValue });
      },
      1
    )
  }

  onSimulateBusyAppPress = (value) => {
    if (value) {
      this.timer = setInterval(() => {
        for (let i=0; i<5e8; i++) {}
      }, 500);
    } else {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = undefined;
      }
    }
    this.setState({simulateBusyApp: value});
  }

  startAnimationLoop = () => {
    this.animationLoop = Animated.loop(
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: this.state.useNativeDriver,
      }),
    );
    this.animationLoop.start();
  }

  stopAnimationLoop = () => {
    this.animationLoop.stop();
  }

  stopTimer = () => this.interval && clearInterval(this.interval);

  componentWillUnmount() {
    this.stopTimer();
  }

  onChangeUseAnimationAPI = () => {
    if (this.state.useAnimationAPI) {
      this.startTimer();
      this.stopAnimationLoop();
    } else {
      this.stopTimer();
      this.startAnimationLoop();
    }
    this.setState({ useAnimationAPI: !this.state.useAnimationAPI});

    bridgeChecker.reset();
    }

  render() {
    const AnimationComponent = this.state.useAnimationAPI ? ITPAnimatedAPI : ITPAnimation;
    const value = this.state.useAnimationAPI ? this.animatedValue : this.state.value;
    const rotation = this.state.useAnimationAPI ? this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '100deg']
      }) : `${this.state.value*100}deg`;
    const backgroundColor1 = this.state.useAnimationAPI && this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [COLOR1(0), COLOR2(1)]
      })
    const backgroundColor2 = this.state.useAnimationAPI && this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [COLOR1(1), COLOR2(0)]
      })
    const fontSize = this.state.useAnimationAPI && this.animatedValue.interpolate({
        inputRange: [0,1],
        outputRange: [0, 30]
    })
    // console.log('update render', this.state.value);

    const row =
        this.state.useNativeDriver ?
          <View style={styles.row}>
            <AnimationComponent value={this.state.value} rotation={rotation} backgroundColor1={COLOR1(0.5)} backgroundColor1={COLOR2(0.3)} fontSize={30}/>
            <AnimationComponent value={this.state.value} rotation={rotation} backgroundColor1={COLOR1(0.5)} backgroundColor1={COLOR2(0.3)} fontSize={30}/>
            <AnimationComponent value={this.state.value} rotation={rotation} backgroundColor1={COLOR1(0.5)} backgroundColor1={COLOR2(0.3)} fontSize={30}/>
          </View>
        :
        <View style={styles.row}>
          <AnimationComponent value={this.state.value} rotation={rotation} backgroundColor1={backgroundColor1} backgroundColor2={backgroundColor2} fontSize={fontSize}/>
          <AnimationComponent value={this.state.value} rotation={rotation} backgroundColor1={backgroundColor1} backgroundColor2={backgroundColor2} fontSize={fontSize}/>
          <AnimationComponent value={this.state.value} rotation={rotation} backgroundColor1={backgroundColor1} backgroundColor2={backgroundColor2} fontSize={fontSize}/>
        </View>


    return (
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Simulate busy JS Thread: </Text>
          <Switch
            value={this.state.simulateBusyApp}
            onValueChange={this.onSimulateBusyAppPress}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Use animation API: </Text>
          <Switch
            value={this.state.useAnimationAPI}
            onValueChange={() => this.onChangeUseAnimationAPI()}
          />
        </View>
        {row}
        {row}
        {row}
        {row}
        {row}
        {row}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'green',
    borderRadius: 6
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
    color: 'black'
  }
});
