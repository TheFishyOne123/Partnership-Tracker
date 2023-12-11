import React from 'react'
import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage';
import UsersAdminPage from './pages/UsersAdminPage';
import './index.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/user' element={<HomePage/>}/>
      <Route path='/admin' element={<AdminPage/>}/>
      <Route path='/admin/users' element={<UsersAdminPage/>}/>
    </Routes>
  )
}

export default App