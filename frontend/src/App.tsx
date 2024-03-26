import React, { useEffect } from 'react'
import './App.css'
import { ChatProvider } from './features/chat/ChatContext'
import { Router } from './pages/Router/Router'
import { MantineProvider, rem } from '@mantine/core'
import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import {
  fontSizeAtom,
  fontSizesBig,
  fontSizesClassic,
} from './pages/settings/fontAtom'
import api from './api/api'
import { useAuth } from './features/authentication/hooks/useAuth'
import { Notifications } from '@mantine/notifications'

const App = () => {
  const fontSize = useAtomValue(fontSizeAtom)
  const fontSizes = fontSize === 'big' ? fontSizesBig : fontSizesClassic

  return (
    <MantineProvider theme={{ fontSizes: fontSizes }}>
      <Notifications position="top-right" />
      <React.StrictMode>
        <AuthProvider>
          <BrowserRouter>
            <ChatProvider>
              <Router />
            </ChatProvider>
          </BrowserRouter>
        </AuthProvider>
      </React.StrictMode>
    </MantineProvider>
  )
}

export default App
