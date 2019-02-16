import React, { Component } from 'react'
import { Animated, Easing } from 'react-native'
import ProgressCircle from '..'

const ANIMATION_DURATION = 500

export default class AndroidSpinner extends Component {
  state = {
    shouldToggleValues: true,
    animatedValue: new Animated.Value(0),
    percent: 0.05,
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
            easing: Easing[this.state.shouldToggleValues ? 'in' : 'out'](
              Easing.sin
            ),
          }}
        />
      </Animated.View>
    )
  }

  rotateSpinner = () =>
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.sin),
      useNativeDriver: true,
    }).start(() => {
      this.state.animatedValue.setValue(0)
      this.setState({
        percent: this.state.shouldToggleValues ? 0.95 : 0.05,
        shouldToggleValues: !this.state.shouldToggleValues,
      })
      this.rotateSpinner()
    })
}
