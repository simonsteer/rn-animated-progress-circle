# React Native Animated Progress Circle

### Props

| PROP                    | TYPE      | DESCRIPTION                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| percent                 | Number    | Number between 0-1 which indicates the total progress.                                                                                                                                                                                                                                                                                                                         |
| size                    | Number    | Sets the size of the progress circle.                                                                                                                                                                                                                                                                                                                                          |
| thickness               | Number    | Sets the thickness of the progress circle.                                                                                                                                                                                                                                                                                                                                     |
| color                   | String    | Sets the color of the complete portion of the progress circle.                                                                                                                                                                                                                                                                                                                 |
| unfilledColor           | String    | Sets the color of the incomplete portion of the progress circle.                                                                                                                                                                                                                                                                                                               |
| style                   | Object    | Any arbitrary styles you want to pass to the component.                                                                                                                                                                                                                                                                                                                        |
| children                | ReactNode | Any children you want to appear in the center of the progress circle.                                                                                                                                                                                                                                                                                                          |
| animationMethod         | String    | Animation method to be used. One of 'timing', 'spring', 'bounce', 'decay'. Setting this value will animate the component.                                                                                                                                                                                                                                                      |
| animationConfig         | Object    | Configuration object to set animation parameters. See configuration docs for [timing](https://facebook.github.io/react-native/docs/animated#timing), [spring](https://facebook.github.io/react-native/docs/animated#spring), [bounce](https://facebook.github.io/react-native/docs/animated#bounce), and [decay](https://facebook.github.io/react-native/docs/animated#decay). |
| shouldAnimateFirstValue | Boolean   | Indicates whether the initial value passed to the `percent` prop should animate in or not. Defaults to false. If set to true, the default animation method is `timing` and the default configuration is `{ duration: 200 }`, unless otherwise specified via `animationMethod` and `animationConfig` props.                                                                     |
| onChange                | Function  | Callback function which gets called when the `percent` prop changes.                                                                                                                                                                                                                                                                                                           |
| onChangeAnimationEnd    | Functin   | Callback function which gets called when the animation that occurs after the `percent` prop changes is complete.                                                                                                                                                                                                                                                               |

### Example

![animated gif of progress circle changing to different percentages of completion](https://raw.githubusercontent.com/simonsteer/rn-animated-progress-circle/master/example.gif)

```
<ProgressCircle
  percent={percent}
  size={120}
  thickness={4}
  color="#2b80ff"
  unfilledColor="#f2f2f2"
  animationMethod="spring"
  animationConfig={{ speed: 4 }}
>
  <Text
    style={{ color: '#2b80ff', fontSize: 18, fontWeight: 'bold' }}
  >
    {`${Math.floor(percent * 100)}%`}
  </Text>
</ProgressCircle>
```
