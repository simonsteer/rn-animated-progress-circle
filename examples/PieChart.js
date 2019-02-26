import React from 'react'
import { View } from 'react-native'
import ProgressCircle from '..'

const PieChart = ({ size, data }) => {
  const total = data.reduce((acc, { value }) => (acc += value), 0)

  return (
    <View style={{ width: size, height: size }}>
      {data.map(({ value, color }, index) => {
        const percentage = value / total
        const totalCurrentPercentage = data
          .slice(0, index)
          .reduce((acc, { value }) => (acc += value / total), 0)
        const rotate = `${totalCurrentPercentage * 360}deg`

        return (
          <ProgressCircle
            key={`pie-slice-${index}`}
            color={color}
            value={percentage}
            size={size}
            thickness={size / 2}
            style={{
              position: 'absolute',
              transform: [{ rotate }],
            }}
          />
        )
      })}
    </View>
  )
}

export default PieChart
