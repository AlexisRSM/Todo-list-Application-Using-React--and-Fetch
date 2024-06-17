import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Components/Todo_list'
import Todo_list from './Components/Todo_list'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container text-center">
      <Todo_list/>
      <Footer/>
    </div>
  )
}

export default App
