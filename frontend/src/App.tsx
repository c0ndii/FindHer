import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Welcome } from './pages/welcome'
import { Account } from './pages/account'
import { Preferences } from './pages/preferences'
import { Interests } from './pages/interests'
import { Settings } from './pages/settings'
import { SignIn } from './pages/signIn/SignIn'
import { SignUp } from './pages/signUp/SignUp'
//import LogoutView from './pages/LogoutView/LogoutView'
import RequireAuth from './utils/RequireAuth'
import { MatchForm } from './features/matchForm'
import RequireNoAuth from './utils/RequireNoAuth'
import { Chat } from './pages/chat'
import { ChatProvider } from './features/chat/ChatContext'
import { Home } from './pages/home'
import { Layout } from './layouts/loggedLayout'

const App = () => {
  return (
    <ChatProvider>
      <Routes>
        <Route path="/" element={<RequireNoAuth />}>
          <Route index element={<Welcome />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Route>
        <Route
          path="/app"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="Account" element={<Account />} />
          <Route path="Preferences" element={<Preferences />} />
          <Route path="Interests" element={<Interests />} />
          <Route path="Matchform" element={<MatchForm />} />
          <Route path="Settings" element={<Settings />} />
          <Route path="Home" element={<Home />} />
          <Route path="Chat" element={<Chat />} />
        </Route>
      </Routes>
    </ChatProvider>
  )
}

export default App
