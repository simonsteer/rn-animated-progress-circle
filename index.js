import React, { Component } from 'react'
import { View, Animated } from 'react-native'

export default class ProgressCircle extends Component {
  static defaultProps = {
    percent: 0,
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
      isFirstAnimationComplete: false,
      animatedValue: new Animated.Value(
        props.shouldAnimateFirstValue ? 0 : props.percent
      ),
    }
  }

  componentWillReceiveProps({ percent }) {
    this.handleChange(percent)
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

  get canAnimate() {
    const { animationMethod } = this.props
    return animationMethod && this.ANIMATION_TYPES.includes(animationMethod)
  }

  get animationMethod() {
    return this.ANIMATION_TYPES.includes(this.props.animationMethod)
      ? this.props.animationMethod
      : 'timing'
  }

  handleChange = (percent = this.props.percent) => {
    const {
      props: { onChange, shouldAnimateFirstValue },
      state: { isFirstAnimationComplete },
    } = this

    const isAnimatingFirstValue =
      shouldAnimateFirstValue && !isFirstAnimationComplete

    onChange()
    if (this.canAnimate || isAnimatingFirstValue) {
      this.animateChange(percent)
      if (!isFirstAnimationComplete) {
        this.setState({ isFirstAnimationComplete: true })
      }
    } else {
      this.state.animatedValue.setValue(percent)
    }
  }

  animateChange = percent =>
    Animated[this.animationMethod](this.state.animatedValue, {
      toValue: percent,
      ...this.props.animationConfig,
      useNativeDriver: true,
    }).start(this.props.onChangeAnimationEnd)

  renderHalfCircle = ({
    isFlipped = false,
    styles: { halfCircleContainerStyle = {}, fullCircleStyle = {} },
  } = {}) => {
    const { size, color, thickness } = this.props
    return (
      <View
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
                rotate: this.state.animatedValue.interpolate({
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
