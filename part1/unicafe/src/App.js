import { useState } from 'react'

const Statistics = (props) => {
  <h1>statics</h1>
  if (props.all === 0) {
    return(
      <p>No feedback given</p>
    )
  }else{
    return(
      <table>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={props.all} />
        <StatisticLine text="average" value ={(props.good - props.bad)/props.all} />
        <StatisticLine text="positive" value ={props.good/props.all*100}/>
      </table>
      // <p>
      //   good {props.good}<br></br>
      //   neutral {props.neutral}<br></br>
      //   bad {props.bad}<br></br>
      //   all {props.all}<br></br>
      //   average {(props.good - props.bad)/props.all}<br></br>
      //   positive {props.good/props.all*100}%
      // </p>
    )
  }
}

const StatisticLine = (props) => {
  if(props.text === "positive"){
    return(
      <tr>
        <td>{props.text}</td>
        <td>{props.value}%</td>
      </tr>
    )
  }else{
    return(
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
      
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(updatedNeutral + good + bad)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(updatedBad + neutral + good)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <Statistics all={all} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

export default App