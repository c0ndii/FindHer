import React from 'react'
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

const App = () => {
  const fontSize = useAtomValue(fontSizeAtom)
  const fontSizes = fontSize === 'big' ? fontSizesBig : fontSizesClassic
  return (
    <MantineProvider theme={{ fontSizes: fontSizes }}>
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
