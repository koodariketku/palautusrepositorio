import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const History = ({total, left, right, keskiarvo, center}) => {
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <Statistics left={left} right={right} keskiarvo={keskiarvo} total={total} center={center}/>
    </div>
  )
}

const StatisticLine = (props) => (

  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>

)


const Statistics = ({ left, right, total, keskiarvo, center }) => {
  return(
    <div>
    <table>
    <tbody>
      <StatisticLine text="good" value ={left} />
      <StatisticLine text="neutral" value ={center} />
      <StatisticLine text="bad" value ={right} />
      <StatisticLine text="all" value ={total} />
      <StatisticLine text="average" value ={(keskiarvo / total)} />
      <StatisticLine text="positive" value ={(left / total * 100)} />
    </tbody>
    </table>
    </div>
  )
}


const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [center, setCenter] = useState(0)
  const [total, setTotal] = useState(0)
  const [keskiarvo, setKeskiarvo] = useState(0)

  const handleLeftClick = () => {
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setKeskiarvo(keskiarvo+1)
    setTotal(updatedLeft + right + center)
  }

  const handleRightClick = () => {
    const updatedRight = right + 1
    setRight(updatedRight)
    setKeskiarvo(keskiarvo-1)
    setTotal(left + updatedRight + center)
  }

  const handleCenterClick = () => {
    const updatedCenter = center + 1
    setCenter(updatedCenter)
    setTotal(left + right + updatedCenter)
  }
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleLeftClick} text='good' />
      <Button handleClick={handleCenterClick} text='neutral' />
      <Button handleClick={handleRightClick} text='bad' />
      <h1>statistic</h1>
      <History total={total} left={left} right={right} keskiarvo={keskiarvo} center={center}/>
      
    </div>
  )
}


export default App