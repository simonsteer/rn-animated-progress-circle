import React from 'react'
import { Text } from 'react-native'
import ProgressCircle from '..'

const AnimatedSpring = ({ value }) => (
  <ProgressCircle
    value={value}
    size={120}
    thickness={4}
    color="#2b80ff"
    unfilledColor="#f2f2f2"
    animationMethod="spring"
    animationConfig={{ speed: 4 }}
  >
    <Text style={{ color: '#E82424', fontSize: 18, fontWeight: 'bold' }}>
      {`${Math.floor(percent * 100)}%`}
    </Text>
  </ProgressCircle>
)

export default AnimatedSpring
