import { useState } from 'react'
import './App.css'

const useCounter = (initialValue = 0) => {
  const [counter, setCounter] = useState(initialValue);

  const increase = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);
  const reset = () => setCounter(0);

  return{
    counter,
    increase,
    decrement,
    reset
  }
}

function App() {
  const counterLeft = useCounter(0.5);
  const counterRight = useCounter(0);

  return (
    <>
      <h3>{counterLeft.counter}</h3>
      <button onClick={counterLeft.increase}>+</button>
      <button onClick={counterLeft.decrement}>-</button>
      <button onClick={counterLeft.reset}>cero</button>

      <h3>{counterRight.counter}</h3>
      <button onClick={counterRight.increase}>+</button>
      <button onClick={counterRight.decrement}>-</button>
      <button onClick={counterRight.reset}>cero</button>
    </>
  )
}

export default App
