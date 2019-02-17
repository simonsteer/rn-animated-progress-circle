import React, { Component } from 'react'
import { Animated, Easing } from 'react-native'
import ProgressCircle from '..'

const ANIMATION_DURATION = 500

export default class AndroidSpinner extends Component {
  state = {
    shouldToggleValues: true,
    animatedValue: new Animated.Value(0),
    percent: 0.1,
  }

  componentDidMount() {
    this.rotateSpinner()
  }

  render() {
    return (
      <Animated.View
        style={{
          transform: [
            {
              rotate: this.state.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['30deg', '390deg'],
              }),
            },
          ],
        }}
      >
        <ProgressCircle
          size={60}
          thickness={6}
          color="#7e42ed"
          shouldAnimateFirstValue
          percent={this.state.percent}
          animationMethod="timing"
          animationConfig={{
            duration: ANIMATION_DURATION,
            easing: Easing.linear,
          }}
        />
      </Animated.View>
    )
  }

  rotateSpinner = () => {
    this.setState({
      percent: this.state.shouldToggleValues ? 0.9 : 0.1,
      shouldToggleValues: !this.state.shouldToggleValues,
    })
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      this.state.animatedValue.setValue(0)
      this.rotateSpinner()
    })
  }
}
