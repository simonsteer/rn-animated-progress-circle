import React from 'react'
import ProgressCircle from '..'

const AnimatedSpring = ({ percent }) => (
  <ProgressCircle
    percent={percent}
    size={120}
    thickness={4}
    color="#2b80ff"
    unfilledColor="#f2f2f2"
    animationMethod="spring"
    animationConfig={{ speed: 4 }}
  >
    <Text style={{ color: '#2b80ff', fontSize: 18, fontWeight: 'bold' }}>
      {`${Math.floor(percent * 100)}%`}
    </Text>
  </ProgressCircle>
)

export default AnimatedSpring
