# React Native Animated Progress Circle
### Props
| PROP        | TYPE      | DESCRIPTION                                                          |
|-------------|-----------|----------------------------------------------------------------------|
| percent     | Number    | number between 0-1 which indicates the total progress                |
| size        | Number    | sets the size of the progress circle                                 |
| color       | String    | sets the color of the complete portion of the progress circle        |
| shadowColor | String    | sets the color of the incomplete portion of the progress circle      |
| thickness   | Number    | sets the thickness of the progress circle                            |
| children    | ReactNode | any children you want to appear in the center of the progress circle |
| style       | Object    | any arbitrary styles you want to pass to the component               |

### Example
![animated gif of progress circle changing to different percentages of completion](https://raw.githubusercontent.com/simonsteer/rn-animated-progress-circle/master/example.gif)

```
<ProgressCircle
  percent={percent}
  size={120}
  thickness={4}
  color="#2b80ff"
  shadowColor="#f2f2f2"
>
  <Text
    style={{ color: '#2b80ff', fontSize: 18, fontWeight: 'bold' }}
  >
    {`${Math.floor(percent * 100)}%`}
  </Text>
</ProgressCircle>
```
