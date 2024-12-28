import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad

  if (all === 0) {
    return <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  }

  return <>
    <h1>statistics</h1>
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={(good - bad) / all} />
      <StatisticLine text="positive" value={(good / all) * 100} />
    </table>
  </>  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App