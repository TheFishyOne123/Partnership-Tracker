import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import UsersAdminPage from './pages/UsersAdminPage'
import PartnersAdminPage from './pages/PartnersAdminPage'
import PartnerRequestsPage from './pages/PartnerRequestsPage'
import './index.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/user' element={<HomePage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/admin/users' element={<UsersAdminPage />} />
      <Route path='/admin/partners' element={<PartnersAdminPage />} />
      <Route path='/admin/requests' element={<PartnerRequestsPage />} />
    </Routes>
  )
}

export default App
