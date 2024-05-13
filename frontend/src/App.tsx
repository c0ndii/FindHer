import React from 'react'
import './App.css'
import { ChatProvider } from './features/chat/ChatContext'
import { Router } from './pages/Router/Router'
import { MantineProvider } from '@mantine/core'
import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter } from 'react-router-dom'
import { useAtomValue } from 'jotai'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {
  fontSizeAtom,
  fontSizesBig,
  fontSizesClassic,
} from './pages/settings/fontAtom'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => {
  const fontSize = useAtomValue(fontSizeAtom)
  const fontSizes = fontSize === 'big' ? fontSizesBig : fontSizesClassic
  const client_id = process.env.REACT_APP_CLIENT_ID?.toString()

  return (
    <GoogleOAuthProvider clientId={client_id ? client_id : ''}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </GoogleOAuthProvider>
  )
}

export default App
