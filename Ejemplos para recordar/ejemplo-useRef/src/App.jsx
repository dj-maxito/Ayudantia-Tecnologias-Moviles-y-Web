import { useRef } from 'react'
import './App.css'

function App() {
  const inputRef = useRef(null);

  function handleFocus(){
  inputRef.current.focus();
}

  return (
    <>
      <input ref={inputRef} type="text"/>
      <button onClick={handleFocus}>Focus the input</button>
      {console.log(inputRef.current)}
    </>
  )
}

export default App
