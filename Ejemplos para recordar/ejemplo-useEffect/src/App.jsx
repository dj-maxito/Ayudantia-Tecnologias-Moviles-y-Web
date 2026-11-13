import { useEffect, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log("Contador: ", count);

    return(
      console.log("Limpiado")
    )
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count+1)}>Sumar</button>
    </div>
  )
}

export default App
