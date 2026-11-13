import { useState } from "react"

function Likes (){
  const [likes, setLikes] = useState(0);

  return <button onClick={() => {setLikes(likes +1)}}>{likes} likes</button>
}

function App() {
  return (
    <>
      <Likes likes={12}/>
    </>
  )
}

export default App
