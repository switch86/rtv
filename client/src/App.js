import React, { useContext } from 'react'
import Auth from './components/Auth'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Public from './components/Public'
import { Route, Routes, Navigate } from 'react-router-dom'
import { UserContext } from './context/UserProvider'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {

  const {token, logout} = useContext(UserContext)

  return (
    <div className="app">
      {token && <Navbar logout={logout} token={token}/>}
      <Routes>
        <Route 
          exact path='/'
          element={token ? <Navigate to='/profile'/> : <Auth />}
        />
        <Route 
          path='/profile'
          element={<ProtectedRoute token={token} redirectTo='/'>
            <Profile />
          </ProtectedRoute>}
        />
        <Route 
          path='/public'
          element={<ProtectedRoute token={token} redirectTo='/'>
            <Public />
          </ProtectedRoute>}
        />
      </Routes>
    </div>
  )
}