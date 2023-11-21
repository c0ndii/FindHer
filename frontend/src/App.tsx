import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Welcome } from './routes/Welcome'
import { Layout } from './components/Layout'
import { AccountView } from './view/AccountView'
import { PreferencesView } from './view/PreferencesView'
import { InterestsView } from './view/InterestsView'
import { SettingsView } from './view/SettingsView'
import { SignIn } from './routes/SignIn'
import { SignUp } from './routes/SignUp'
import LogoutView from './view/LogoutView/LogoutView'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import { useAtom } from 'jotai';
import { isAuthenticated } from './utils/Authentication'


const App = () => {
  const [isAuth,] = useAtom(isAuthenticated);
  console.log(isAuth);
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/app" element={<ProtectedRoute isAuth={isAuth}><Layout /></ProtectedRoute>}>
        <Route path="Account" element={<AccountView />} />
        <Route path="Preferences" element={<PreferencesView />} />
        <Route path="Interests" element={<InterestsView />} />
        <Route path="Settings" element={<SettingsView />} />
        <Route path="Logout" element={<LogoutView />} />
      </Route>
    </Routes>
  )
}

export default App
