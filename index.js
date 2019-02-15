import React, { Component } from 'react'
import { View, Animated } from 'react-native'

export default class ProgressCircle extends Component {
  static defaultProps = {
    size: 64,
    thickness: 7,
    color: '#4c90ff',
    shadowColor: 'white',
    children: null,
    style: {},
    percent: 0,
  }

  constructor(props) {
    super(props)
    this.state = {
      animatedValue: new Animated.Value(props.percent),
    }
    this.circleStyle = {
      width: props.size,
      height: props.size,
      borderRadius: props.size / 2,
    }
  }

  componentWillReceiveProps({ percent }) {
    if (
      percent === null ||
      percent === undefined ||
      this.props.percent === percent
    ) {
      return
    }

    Animated.spring(this.state.animatedValue, {
      toValue: percent,
      speed: 4,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const { thickness, shadowColor, children, style } = this.props

    return (
      <View style={[{ flexDirection: 'row' }, this.circleStyle, style]}>
        <View
          style={[
            this.circleStyle,
            {
              borderWidth: thickness,
              borderColor: shadowColor,
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          {children}
        </View>
        {this.renderLeftHalfCircle()}
        {this.renderRightHalfCircle()}
      </View>
    )
  }

  renderLeftHalfCircle = () => {
    const rotate = this.state.animatedValue.interpolate({
      inputRange: [0.5, 1],
      outputRange: ['0deg', '180deg'],
      extrapolate: 'clamp',
    })

    return this.renderHalfCircle({ rotate })
  }

  renderRightHalfCircle = () => {
    const rotate = this.state.animatedValue.interpolate({
      inputRange: [0, 0.5],
      outputRange: ['360deg', '180deg'],
      extrapolate: 'clamp',
    })

    return this.renderHalfCircle({ rotate, isFlipped: true })
  }

  renderHalfCircle = ({ rotate, isFlipped = false } = {}) => {
    const { size, color, thickness } = this.props
    return (
      <View
        style={{
          overflow: 'hidden',
          width: size / 2,
          height: size,
          transform: [{ scaleX: isFlipped ? -1 : 1 }],
        }}
      >
        <Animated.View
          style={{
            width: size,
            height: size,
            paddingLeft: size / 2,
            transform: [{ rotate }],
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              width: size / 2,
              height: size,
              overflow: 'hidden',
            }}
          >
            <View
              style={[
                this.circleStyle,
                {
                  borderWidth: thickness,
                  borderColor: color,
                  transform: [{ translateX: -size / 2 }],
                },
              ]}
            />
          </View>
        </Animated.View>
      </View>
    )
  }
}
