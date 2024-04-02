
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Preview from './components/Preview'

function App() {

  return (
    <Routes>  
      <Route path='/' element={<Home/>} />
      <Route path='/preview' element={<Preview/>} ></Route>
    </Routes>
  )
}

export default App
