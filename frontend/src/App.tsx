import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Welcome } from './routes/Welcome'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/SignIn" element={<Welcome />} />
      <Route path="/SignUp" element={<Welcome />} />
    </Routes>
  )
}

export default App
