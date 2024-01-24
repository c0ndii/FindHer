import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Welcome } from './routes/Welcome'
import { AccountView } from './view/AccountView'
import { PreferencesView } from './view/PreferencesView'
import { InterestsView } from './view/InterestsView'
import { SettingsView } from './view/SettingsView'
import { SignIn } from './routes/SignIn'
import { SignUp } from './routes/SignUp'
//import LogoutView from './view/LogoutView/LogoutView'
import RequireAuth from './components/Authentication/components/RequireAuth'
import { MatchForm } from './components/MatchForm'
import RequireNoAuth from './components/Authentication/components/RequireNoAuth'
import { HomeView } from './view/HomeView'
import { ChatView } from './view/ChatView'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RequireNoAuth />}>
        <Route index element={<Welcome />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Route>
      <Route path="/app" element={<RequireAuth />}>
        <Route path="Account" element={<AccountView />} />
        <Route path="Preferences" element={<PreferencesView />} />
        <Route path="Interests" element={<InterestsView />} />
        <Route path="Matchform" element={<MatchForm />} />
        <Route path="Settings" element={<SettingsView />} />
        <Route path="Home" element={<HomeView />} />
        <Route path="Chat" element={<ChatView />} />
      </Route>
    </Routes>
  )
}

export default App
