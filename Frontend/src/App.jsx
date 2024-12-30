import React from 'react'
import {BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Signout from './pages/Signout'
import About from './pages/About'
import Header from './components/Header'
function App() {
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/profile' element={<Profile/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/signout' element={<Signout/>}></Route>
    <Route path='/about' element={<About/>}></Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
