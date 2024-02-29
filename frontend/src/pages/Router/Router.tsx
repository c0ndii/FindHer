import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RequireNoAuth from '../../utils/RequireNoAuth'
import { Welcome } from '../welcome'
import { SignIn } from '../signIn/SignIn'
import { SignUp } from '../signUp/SignUp'
import RequireAuth from '../../utils/RequireAuth'
import { Layout } from '../../layouts/loggedLayout'
import { Account } from '../account'
import { Preferences } from '../preferences'
import { Interests } from '../interests'
import { MatchForm } from '../../features/matchForm'
import { Settings } from '../settings'
import { Home } from '../home'
import { Chat } from '../chat'

export const Router = () => {
  return (
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
  )
}
