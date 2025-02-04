import React from 'react'
import {BrowserRouter , Routes , Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Signout from './pages/Signout'
import About from './pages/About'
import Header from './components/Header'
import Signin from './pages/Signin'
import Privateprofile from './components/Privateprofile';
import Createlisting from './pages/createlisting';
import Updatelisting from './pages/Updatelisting';
function App() {
  return (
    <>
    <ToastContainer/>
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route element={<Privateprofile/>}>
    <Route path='/profile' element={<Profile/>}></Route>
    <Route path='/createlisting' element={<Createlisting/>}></Route>
    <Route path='/updatelisting/:listingId' element={<Updatelisting/>}></Route>
    </Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/signout' element={<Signout/>}></Route>
    <Route path='/signin' element={<Signin/>}></Route>
    <Route path='/about' element={<About/>}></Route>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
