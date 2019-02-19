import React, { Component } from 'react'
import { View, Animated } from 'react-native'

export default class ProgressCircle extends Component {
  static defaultProps = {
    value: 0,
    size: 64,
    thickness: 7,
    color: '#4c90ff',
    unfilledColor: 'transparent',
    style: {},
    children: null,
    animationMethod: null,
    animationConfig: { duration: 200 },
    shouldAnimateFirstValue: false,
    onChange() {},
    onChangeAnimationEnd() {},
  }

  constructor(props) {
    super(props)
    this.state = {
      animatedValue:
        props.value.constructor.name === 'AnimatedValue'
          ? null
          : new Animated.Value(props.shouldAnimateFirstValue ? 0 : props.value),
    }
  }

  componentWillReceiveProps({ value }) {
    this.handleChange(value)
  }

  render() {
    const { thickness, unfilledColor, children, style, size } = this.props
    const styles = {
      fullCircleStyle: {
        width: size,
        height: size,
        borderRadius: size / 2,
      },
      halfCircleContainerStyle: {
        width: size / 2,
        height: size,
        overflow: 'hidden',
      },
    }

    return (
      <View style={[{ flexDirection: 'row' }, styles.fullCircleStyle, style]}>
        <View
          pointerEvents="box-none"
          style={[
            styles.fullCircleStyle,
            {
              borderWidth: thickness,
              borderColor: unfilledColor,
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          {children}
        </View>
        {this.renderHalfCircle({ styles })}
        {this.renderHalfCircle({ isFlipped: true, styles })}
      </View>
    )
  }

  ANIMATION_TYPES = ['timing', 'spring', 'bounce', 'decay']
  get animationMethod() {
    return this.ANIMATION_TYPES.includes(this.props.animationMethod)
      ? this.props.animationMethod
      : null
  }

  handleChange = (value = this.props.value) => {
    this.props.onChange()
    if (value.constructor.name === 'AnimatedValue') {
      return
    }

    if (this.animationMethod) {
      this.animateChange(value)
    } else {
      this.state.animatedValue.setValue(value)
    }
  }

  animateChange = value =>
    Animated[this.animationMethod](this.state.animatedValue, {
      toValue: value,
      useNativeDriver: true,
      ...this.props.animationConfig,
    }).start(this.props.onChangeAnimationEnd)

  renderHalfCircle = ({
    isFlipped = false,
    styles: { halfCircleContainerStyle = {}, fullCircleStyle = {} },
  } = {}) => {
    const { size, color, thickness, value } = this.props
    const valueToInterpolate =
      value.constructor.name === 'AnimatedValue'
        ? value
        : this.state.animatedValue

    return (
      <View
        pointerEvents="none"
        style={{
          ...halfCircleContainerStyle,
          transform: [{ scaleX: isFlipped ? -1 : 1 }],
        }}
      >
        <Animated.View
          style={{
            ...fullCircleStyle,
            paddingLeft: size / 2,
            flexDirection: 'row',
            overflow: 'hidden',
            transform: [
              {
                rotate: valueToInterpolate.interpolate({
                  inputRange: isFlipped ? [0, 0.5] : [0.5, 1],
                  outputRange: isFlipped
                    ? ['360deg', '180deg']
                    : ['0deg', '180deg'],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        >
          <View style={halfCircleContainerStyle}>
            <View
              style={[
                fullCircleStyle,
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
