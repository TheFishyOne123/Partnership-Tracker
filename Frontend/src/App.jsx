import React from 'react'
import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage';
import './index.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/user' element={<HomePage/>}/>
      <Route path='/admin' element={<AdminPage/>}/>
    </Routes>
  )
}

export default App